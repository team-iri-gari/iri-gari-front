<script setup>
import SearchBox from "@/components/SearchBox.vue";
import SearchBox1 from "./SearchBox1.vue";
import Logo from "../components/common/Logo.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import "@/assets/css/home.css";

const router = useRouter();

const onSubmitSearch = (keyword) => {
  router.push(`/search/${encodeURIComponent(keyword)}`);
};

onMounted(() => {
  init();
});

function init() {
  var $section = document.querySelector("section");

  // Methods/polyfills.

  // classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
  !(function () {
    function t(t) {
      this.el = t;
      for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++)
        e.call(this, n[i]);
    }
    function n(t, n, i) {
      Object.defineProperty ? Object.defineProperty(t, n, { get: i }) : t.__defineGetter__(n, i);
    }
    if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) {
      var i = Array.prototype,
        e = i.push,
        s = i.splice,
        o = i.join;
      (t.prototype = {
        add: function (t) {
          this.contains(t) || (e.call(this, t), (this.el.className = this.toString()));
        },
        contains: function (t) {
          return -1 != this.el.className.indexOf(t);
        },
        item: function (t) {
          return this[t] || null;
        },
        remove: function (t) {
          if (this.contains(t)) {
            for (var n = 0; n < this.length && this[n] != t; n++);
            s.call(this, n, 1), (this.el.className = this.toString());
          }
        },
        toString: function () {
          return o.call(this, " ");
        },
        toggle: function (t) {
          return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t);
        },
      }),
        (window.DOMTokenList = t),
        n(Element.prototype, "classList", function () {
          return new t(this);
        });
    }
  })();

  // canUse
  window.canUse = function (p) {
    if (!window._canUse) window._canUse = document.createElement("div");
    var e = window._canUse.style,
      up = p.charAt(0).toUpperCase() + p.slice(1);
    return p in e || "Moz" + up in e || "Webkit" + up in e || "O" + up in e || "ms" + up in e;
  };

  // window.addEventListener
  (function () {
    if ("addEventListener" in window) return;
    window.addEventListener = function (type, f) {
      window.attachEvent("on" + type, f);
    };
  })();

  // Play initial animations on page load.
  window.addEventListener("load", function () {
    window.setTimeout(function () {
      $section.classList.remove("is-preload");
    }, 100);
  });

  // Slideshow Background.
  (function () {
    // Settings.
    var settings = {
      // Images (in the format of 'url': 'alignment').
      images: {
        "/images/main-bg/bg01.jpg": "center",
        "/images/main-bg/bg02.jpg": "center",
        "/images/main-bg/bg03.jpg": "center",
      },

      // Delay.
      delay: 6000,
    };

    // Vars.
    var pos = 0,
      lastPos = 0,
      wrapper,
      $bgs = [],
      $bg,
      k,
      v;

    // Create BG wrapper, BGs.
    wrapper = document.getElementById("bg");
    $section.appendChild(wrapper);

    for (k in settings.images) {
      // Create BG.
      $bg = document.createElement("div");
      $bg.style.backgroundImage = 'url("' + k + '")';
      $bg.style.backgroundPosition = settings.images[k];
      wrapper.appendChild($bg);

      // Add it to array.
      $bgs.push($bg);
    }

    // Main loop.
    $bgs[pos].classList.add("visible");
    $bgs[pos].classList.add("top");

    // Bail if we only have a single BG or the client doesn't support transitions.
    if ($bgs.length == 1 || !canUse("transition")) return;

    window.setInterval(function () {
      lastPos = pos;
      pos++;

      // Wrap to beginning if necessary.
      if (pos >= $bgs.length) pos = 0;

      // Swap top images.
      $bgs[lastPos].classList.remove("top");
      $bgs[pos].classList.add("visible");
      $bgs[pos].classList.add("top");

      // Hide last image after a short delay.
      window.setTimeout(function () {
        $bgs[lastPos].classList.remove("visible");
      }, settings.delay / 2);
    }, settings.delay);
  })();
}
</script>

<template>
  <section class="is-preload">
    <div class="logo-wrapper">
      <div id="logo">
        <Logo />
      </div>
    </div>
    <div id="banner">
      <img src="/images/logo/irigari-en.png" style="height: 13dvh" />
      <!-- <SearchBox1 /> -->
      <SearchBox :on-submit-search="onSubmitSearch" style="margin: auto" />
    </div>
    <div id="bg"></div>
  </section>
</template>

<style scoped>
section {
  box-sizing: border-box;
}

section {
  height: 100vh;
  width: 100%;
}

section {
  display: -moz-flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  background-color: #000;
  padding: 6em 4em 4em 4em;
}
section.is-preload *,
section.is-preload *:before,
section.is-preload *:after {
  -moz-animation: none !important;
  -webkit-animation: none !important;
  -ms-animation: none !important;
  animation: none !important;
  -moz-transition: none !important;
  -webkit-transition: none !important;
  -ms-transition: none !important;
  transition: none !important;
}
section > * {
  position: relative;
  z-index: 2;
}
/* .content {
  height: 90vh;
  width: 100%;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
} */
.is-preload {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  line-height: 1;
  height: 100vh;
}
.logo-wrapper {
  display: table;
}
#logo {
  display: table-cell;
  vertical-align: middle;
  margin-left: 15px;
}
#banner {
  justify-self: center;
  margin: auto 0 auto 15px;
  z-index: 16;
}
</style>
