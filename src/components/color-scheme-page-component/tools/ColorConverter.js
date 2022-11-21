class ColorConveter {
  normalize(min, max) {
    var delta = max - min;
    return function (val) {
      return (val - min) / delta;
    };
  }

  ConvertRGBToString(rgb) {
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
  }
  ConvertStringToRGB(string) {
    var rgb = [0, 0, 0];
    const arr = [
      ...string.matchAll("rgb\\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})\\)"),
    ];
    if (arr[0] != null) {
      const match = arr[0];
      if (match.length === 4) {
        rgb[0] = Number.parseInt(match[1]);
        rgb[1] = Number.parseInt(match[2]);
        rgb[2] = Number.parseInt(match[3]);
      }
    }
    return rgb;
  }

  ConvertHexToRGB(hex) {
    var rgb = [0, 0, 0];
    const arr = [
      ...hex.matchAll("#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})"),
    ];
    if (arr[0] != null) {
      const match = arr[0];
      if (match.length === 4) {
        rgb[0] = Number.parseInt(match[1], 16);
        rgb[1] = Number.parseInt(match[2], 16);
        rgb[2] = Number.parseInt(match[3], 16);
      }
    }
    return rgb;
  }

  ConvertRGBToHex(rgb) {
    if (rgb != null && rgb.length === 3) {
      return (
        "#" +
        ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
          .toString(16)
          .slice(1)
      );
    }
    return null;
  }

  ConvertRGBToCMYK(rgb) {
    if (rgb != null && rgb.length === 3) {
      const normalizedRBG = rgb.map(this.normalize(0, 255));

      const k = 1 - Math.max(...normalizedRBG);
      var c = (1 - normalizedRBG[0] - k) / (1 - k);
      var m = (1 - normalizedRBG[1] - k) / (1 - k);
      var y = (1 - normalizedRBG[2] - k) / (1 - k);
      if (k === 1) {
        c = m = y = 0;
      }

      var cmyk = [c, m, y, k].map((n) => Math.round(n * 100));

      return cmyk;
    }
    return null;
  }

  ConvertRGBToHSL(rgb) {
    if (rgb != null && rgb.length === 3) {
      const normalizedRBG = rgb.map(this.normalize(0, 255));

      const max = Math.max(...normalizedRBG);
      const min = Math.min(...normalizedRBG);
      var h,
        s,
        l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const r = normalizedRBG[0];
        const g = normalizedRBG[1];
        const b = normalizedRBG[2];

        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        // eslint-disable-next-line default-case
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      const hsl = [h * 360, s * 100, l * 100].map((n) => Math.round(n));

      return hsl;
    }

    return null;
  }

  ConvertToString(formatName, array) {
    var str = formatName + "(" + array.join(",") + ")";

    return str;
  }

  rgbPattern = "rgb\\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})\\)";
  hslPattern = "hsl\\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})\\)";
  cmykPattern = "cmyk\\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3})\\)";

  rgb2hex(rgb) {
    if ((rgb = null || rgb.length !== 3)) return [0,0,0];

    return (
      "#" +
      ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
        .toString(16)
        .slice(1)
    );
  }

  hex2rgb(hex) {
    return this.string2color(hex, "#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})");
  }

  rgb2hsl(rgb) {
    if (rgb == null || rgb.length !== 3) return [0,0,0];

    // const normalizedRBG = rgb.map(this.normalize(0, 255));

    var r = rgb[0]/255;
    var g = rgb[1]/255;
    var b = rgb[2]/255;

    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      // eslint-disable-next-line default-case
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  }

  hsl2rgb(hsl) {
    if (hsl == null || hsl.length !== 3) return [0,0,0];

    var r, g, b;
    var h = hsl[0] / 360;
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
  }

  rgb2cmyk(rgb) {
    if (rgb != null || rgb.length !== 3) {
      const normalizedRBG = rgb.map(this.normalize(0, 255));

      const k = 1 - Math.max(...normalizedRBG);
      var c = (1 - normalizedRBG[0] - k) / (1 - k);
      var m = (1 - normalizedRBG[1] - k) / (1 - k);
      var y = (1 - normalizedRBG[2] - k) / (1 - k);
      if (k === 1) {
        c = m = y = 0;
      }

      var cmyk = [c, m, y, k].map((n) => Math.round(n * 100));

      return cmyk;
    }
    return [0,0,0,0];
  }

  cmyk2rgb(cmyk) {
    if (cmyk == null || cmyk.length !== 4) return [0,0,0,0];

    const normalizedCMYK = cmyk.map(this.normalize(0, 100));

    var c = normalizedCMYK[0];
    var m = normalizedCMYK[1];
    var y = normalizedCMYK[2];
    var k = normalizedCMYK[3];

    c = c * (1 - k) + k;
    m = m * (1 - k) + k;
    y = y * (1 - k) + k;

    var r = 1 - c;
    var g = 1 - m;
    var b = 1 - y;


    return [r * 255, g * 255, b * 255].map((n) => Math.round(n));
  }

  color2string(formatName) {
    return (arr) => formatName + "(" + arr.join(",") + ")";
  }

  string2color(str, pattern) {
    var color = [];
    const arr = [...str.matchAll(pattern)];
    if (arr[0] != null) {
      const match = arr[0];
      color = match.slice(1).map((v) => Number.parseInt(v));
    }
    return color;
  }

  converSchemes(value, first = (value) => value, second = (value) => value) {
    var res = first(value);
    return second(res);
  }
}

export default new ColorConveter();
