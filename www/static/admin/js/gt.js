(function (window, document) {

    if (window.initGeetest) {
        return;
    }

    var head = document.getElementsByTagName("head")[0];
    var protocol = location.protocol + "//";
    var callbacks = [];
    var status;

    var random = function () {
        return parseInt(Math.random() * 10000) + (new Date()).valueOf();
    };
    var run = function () {
        for (var i = 0, len = callbacks.length; i < len; i = i + 1) {
            callbacks[i]();
        }
        callbacks = [];
    };
    var detect = function () {
        return window.Geetest || document.getElementById("gt_lib");
    };
    var down = function () {

        var s = document.createElement("script");
        s.charset = "UTF-8";
        s.type = "text/javascript";

        s.onload = s.onreadystatechange = function () {

            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {

                if (detect()) {

                    status = "loaded";

                    run();

                } else {

                    status = "fail";

                    throw new Error("网络错误");

                }

                s.onload = s.onreadystatechange = null;
            }
        };

        s.onerror = function () {

            status = "fail";
            s.onerror = null;

            throw new Error("网络错误");
        };

        s.src = protocol + "static.geetest.com/static/js/geetest.0.0.0.js";
        head.appendChild(s);

    };

    if (detect()) {

        status = "loaded";

    } else {

        status = "loading";

        var cb = "geetest_" + random();

        window[cb] = function () {

            status = "loaded";

            run();

            window[cb] = undefined;
            try {
                delete window[cb];
            } catch (e) {
            }
        };

        var s = document.createElement("script");
        s.charset = "UTF-8";
        s.type = "text/javascript";

        s.onload = s.onreadystatechange = function () {

            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {

                if (!detect()) {

                    down();

                }

            }
        };

        s.onerror = down;
        s.src = protocol + "api.geetest.com/get.php?callback=" + cb;
        head.appendChild(s);

    }

    window.initGeetest = function (config, callback) {

        var init = function () {

            callback(new window.Geetest(config));

        };

        if (status === "loaded") {

            init();

        } else if (status === "fail") {

            throw new Error("网络错误");

        } else if (status === "loading") {

            callbacks.push(function () {

                init();

            });
        }
    };

})(window, document);