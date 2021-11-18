$(document).ready(function () {

    if (!$('body').hasClass('home')) {
        resize();
        function resize() {
            let ww = $(window).width();
            let containerPad = parseInt($('.header .container').css('width').split('px')[0]);
            let nav = (ww - containerPad) / 2;
            let pad = parseInt($('.header .container').css('padding-right').split('px')[0]);
            $('.navigation').css('right', (nav + pad) + 'px');
        }

        $(window).on('resize', function () {
            resize();
        })
    }

    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
    if (agentID) {
        $('body').addClass('ios');
    }


    $(".header__burger").on("click", function () {
        $("body").toggleClass("no-scroll");
        $(this).toggleClass("active");
        $(".menu").toggleClass("visible");
        if($('.revo').hasClass('show')){
            $('.header').toggleClass("menuRev");
        }
    })

    // add class active menu before reload
    $(".menu__nav a").on("click" , function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        $(".menu__nav a").removeClass("active");
        $(this).addClass("active");
        setTimeout(function() {window.location = href}, 500);

    })


    var isScrolling = false;
    if (window.location.pathname != '/') {
        window.addEventListener("scroll", throttleScroll, false);
        throttleScroll();
    }

    function throttleScroll(e) {
        if (isScrolling == false) {
            window.requestAnimationFrame(function () {
                scrolling(e);
                isScrolling = false;
            });
        }
        isScrolling = true;
    }

    let fadeArr = document.querySelectorAll('.fade-in');

    function scrolling(e) {
        // fade
        for (var i = 0; i < fadeArr.length; i++) {
            var fadeItem = fadeArr[i];
            if (isPartiallyVisible(fadeItem)) {
                fadeItem.classList.add("fade-in-on");
            }
        }
    }


    function isPartiallyVisible(el) {
        var elementBoundary = el.getBoundingClientRect();

        var top = elementBoundary.top;
        var bottom = elementBoundary.bottom;
        var height = elementBoundary.height;

        return ((top + height >= 0) && (height + window.innerHeight >= bottom));
    }

    function isFullyVisible(el) {
        var elementBoundary = el.getBoundingClientRect();

        var top = elementBoundary.top;
        var bottom = elementBoundary.bottom;

        return ((top >= 0) && (bottom <= window.innerHeight));
    }



    if($(".white-screen").length != 0){
        $("body").addClass("no-scroll");
        setTimeout(()=>{
            $("body").removeClass("no-scroll");
            $(".white-screen").addClass("off");
        },450)
    }
})

$(document).ready(function () {

    $('.hideBlack').removeClass('hidden');
    setTimeout(() => {
        $(".contact").addClass("anim-on");
    }, 200)


    if ($('.mission').length != 0) {
        $(window).scroll(function () {
            let scrollTop = $(this).scrollTop();
            let footerOffset = $('.footer').offset().top;
            if (scrollTop >= footerOffset - ($(window).innerHeight() / 1.4)) {
                $('.footer').addClass("fade-ins-on")
            }
        })
    }


    var onScrolltwo = debounce(function (direction) {
        if (direction == true) {
            if($('div').hasClass('contact')) {
                if ($(window).width() >= 1024) {
                    window.location = '/team.html#team_last';
                }
            }
        }
    }, 300, true);


    $('.copyright .mobile__nav--left').on('click', function (e){
        $('.hideBlack').addClass('hidden');
        setTimeout(()=>{
            window.location = '/team.html#team_last';
        }, 500)
    })


    $(window).bind('wheel', function (e) {
        var delta;
        if (event.wheelDelta) {
            delta = event.wheelDelta;
        } else {
            delta = -1 * event.deltaY;
        }
        onScrolltwo(delta >= 0);
    });

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

})

$(document).ready(function () {
    function isEmailAddress(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.trim());
    }

    function isWordss(name) {
        var regex = /^[A-Za-z-А-ю-яієїґЯІЄЇГЁё\s]+$/;
        return regex.test(name.trim());
    }

    function footerValidate(e) {
        let errorValue = 0;
        e.preventDefault()
        const contactName = $(".footer__input-name input");
        const contactLastName = $(".footer__input-surname input");
        const contactEmail = $(".footer__input-email input");
        const contactCompany = $(".footer__input-company input");
        const contactDesignation = $(".footer__input-designation input");
        const errorField = [];
        errorField.push('Wrong name', 'Wrong last name', 'Wrong e-mail', 'Wrong company', 'Wrong designation')
        if (!isEmailAddress(contactEmail.val())) {
            contactEmail.removeClass("valid");
            contactEmail.parent().addClass("error");
            contactEmail.parent().find("span.error").text(errorField[2]).removeClass("hidden")
            errorValue++;
        } else {
            contactEmail.parent().removeClass("error");
            contactEmail.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactEmail.parent().find("span.error").text('');
            }, 200)
            contactEmail.addClass("valid");
        }

        if (!isWordss(contactName.val()) || contactName.val().length <= 2) {
            contactName.removeClass("valid");
            contactName.parent().addClass("error");
            contactName.parent().find("span.error").text(errorField[0]).removeClass("hidden");
            errorValue++;
        } else {
            contactName.parent().removeClass("error");
            contactName.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactName.parent().find("span.error").text('');
            }, 200)
            contactName.addClass("valid");

        }
        if (!isWordss(contactLastName.val()) || contactLastName.val().length <= 2) {
            contactLastName.removeClass("valid");
            contactLastName.parent().addClass("error");
            contactLastName.parent().find("span.error").text(errorField[1]).removeClass("hidden");
            errorValue++;
        } else {
            contactLastName.parent().removeClass("error")
            contactLastName.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactLastName.parent().find("span.error").text('');
            }, 200)
            contactLastName.addClass("valid");

        }
        // validate Subject
        if (contactDesignation.val().length <= 2) {
            contactDesignation.removeClass("valid");
            contactDesignation.parent().addClass("error");
            contactDesignation.parent().find("span.error").text(errorField[4]).removeClass("hidden");
            errorValue++;
        } else {
            contactDesignation.parent().removeClass("error");
            contactDesignation.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactDesignation.parent().find("span.error").text('');
            }, 200)
            contactDesignation.addClass("valid");

        }

        if (contactCompany.val().length <= 2) {
            contactCompany.removeClass("valid");
            contactCompany.parent().addClass("error");
            contactCompany.parent().find("span.error").text(errorField[3]).removeClass("hidden");
            errorValue++;
        } else {
            contactCompany.parent().removeClass("error");
            contactCompany.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactCompany.parent().find("span.error").text('');
            }, 200)
            contactCompany.addClass("valid");

        }
        if (errorValue == 0) {

        }
        $(".footer input").on("change blur keyup", onFormChangeFooter);

    }

    function onFormChangeFooter(e) {

        let errorValue = 0;
        e.preventDefault()
        const contactName = $(".footer__input-name input");
        const contactLastName = $(".footer__input-surname input");
        const contactEmail = $(".footer__input-email input");
        const contactCompany = $(".footer__input-company input");
        const contactDesignation = $(".footer__input-designation input");
        const errorField = [];
        errorField.push('Wrong name', 'Wrong last name', 'Wrong e-mail', 'Wrong company', 'Wrong designation')
        if (!isEmailAddress(contactEmail.val())) {
            contactEmail.parent().removeClass("valid");
            contactEmail.parent().addClass("error");
            contactEmail.parent().find("span.error").text(errorField[2]).removeClass("hidden")
            errorValue++;
        } else {
            contactEmail.parent().removeClass("error");
            contactEmail.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactEmail.parent().find("span.error").text('');
            }, 200)
            contactEmail.parent().addClass("valid");
        }

        if (!isWordss(contactName.val()) || contactName.val().length <= 2) {
            contactName.parent().removeClass("valid");
            contactName.parent().addClass("error");
            contactName.parent().find("span.error").text(errorField[0]).removeClass("hidden");
            errorValue++;
        } else {
            contactName.parent().removeClass("error");
            contactName.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactName.parent().find("span.error").text('');
            }, 200)
            contactName.parent().addClass("valid");

        }
        if (!isWordss(contactLastName.val()) || contactLastName.val().length <= 2) {
            contactLastName.parent().removeClass("valid");
            contactLastName.parent().addClass("error");
            contactLastName.parent().find("span.error").text(errorField[1]).removeClass("hidden");
            errorValue++;
        } else {
            contactLastName.parent().removeClass("error")
            contactLastName.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactLastName.parent().find("span.error").text('');
            }, 200)
            contactLastName.parent().addClass("valid");

        }
        // validate Subject
        if (contactDesignation.val().length <= 2) {
            contactDesignation.parent().removeClass("valid");
            contactDesignation.parent().addClass("error");
            contactDesignation.parent().find("span.error").text(errorField[4]).removeClass("hidden");
            errorValue++;
        } else {
            contactDesignation.parent().removeClass("error");
            contactDesignation.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactDesignation.parent().find("span.error").text('');
            }, 200)
            contactDesignation.parent().addClass("valid");
        }

        if (contactCompany.val().length <= 2) {
            contactCompany.parent().removeClass("valid");
            contactCompany.parent().addClass("error");
            contactCompany.parent().find("span.error").text(errorField[3]).removeClass("hidden");
            errorValue++;
        } else {
            contactCompany.parent().removeClass("error");
            contactCompany.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactCompany.parent().find("span.error").text('');
            }, 200)
            contactCompany.parent().addClass("valid");

        }
    }

    $(".footer__confirm").on("click", footerValidate);

})
$(document).ready(function () {


// footer form split animation
    const labels = document.querySelectorAll('.float-input label span:first-child');
    labels.forEach((item) => {
        item.innerHTML = item.innerText.split('').reduce((res, char) => `${res}<span>${char}</span>`, '');
    })


    let step = 1,
        validateStep2 = false;

    $(".form__submit").on("click", (e) => {
        if (step == 1) {
            validateForm1(e);
        } else {
            validateForm2(e)
        }


    })


    function isEmail(email) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email.trim());
    }

    function isWords(name) {
        var regex = /^[A-Za-z-А-ю-яієїґЯІЄЇГЁё\s]+$/;
        return regex.test(name.trim());
    }

    function isNumber(tel) {
        var regex = /^[0-9 ()+-]+$/;
        return regex.test(tel.trim());
    }

    // validate

    function validateForm1(e) {
        let errorValue = 0;
        e.preventDefault()
        const contactName = $(".form .form__input-name input");
        const contactMail = $(".form .form__input-mail input");
        const contactTel = $(".form .form__input-tel input");
        const errorField = [];
        errorField.push('Wrong name', 'Wrong e-mail', 'Wrong phone number');
        if (!isEmail(contactMail.val())) {
            contactMail.parent().removeClass("valid");
            contactMail.parent().addClass("error");
            contactMail.parent().find("span.error").text(errorField[1]).removeClass("hidden");
            errorValue++;
        } else {
            contactMail.parent().removeClass("error");
            contactMail.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactMail.parent().find("span.error").text('');
            }, 200)
            contactMail.parent().addClass("valid");
        }

        if (!isWords(contactName.val()) || contactName.val().length <= 2) {
            contactName.parent().removeClass("valid");
            contactName.parent().addClass("error");
            contactName.parent().find("span.error").text(errorField[0]).removeClass("hidden");
            errorValue++;

        } else {
            contactName.parent().removeClass("error");
            contactName.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactName.parent().find("span.error").text('');
            }, 200)
            contactName.parent().addClass("valid");
        }
        // validate Subject
        if (!isNumber(contactTel.val()) || contactTel.val().length <= 2) {
            contactTel.parent().addClass("error");
            contactTel.parent().find("span.error").text(errorField[2]).removeClass("hidden");
            errorValue++;
            contactTel.parent().removeClass("valid");
        } else {
            contactTel.parent().removeClass("error");
            contactTel.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactTel.parent().find("span.error").text('');
            }, 200)
            contactTel.parent().addClass("valid");
        }
        if (errorValue == 0) {
            $(".form__wrap").toggleClass("hidden");
            $(".form__line").addClass("active");
            $(".form__step span").text('2');

            step = 2

        }
        $(".form .form__input input").on("change blur keyup", onFormChange);

    }

    function onFormChange(e) {
        let errorValue = 0;
        e.preventDefault()
        const contactName = $(".form .form__input-name input");
        const contactMail = $(".form .form__input-mail input");
        const contactTel = $(".form .form__input-tel input");
        const errorField = [];
        errorField.push('Wrong name', 'Wrong e-mail', 'Wrong phone number');
        if (!isEmail(contactMail.val())) {
            contactMail.parent().removeClass("valid");
            contactMail.parent().addClass("error");
            contactMail.parent().find("span.error").text(errorField[1]).removeClass("hidden");
            errorValue++;
        } else {
            contactMail.parent().removeClass("error");
            contactMail.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactMail.parent().find("span.error").text('');
            }, 200)
            contactMail.parent().addClass("valid");
        }

        if (!isWords(contactName.val()) || contactName.val().length <= 2) {
            contactName.parent().removeClass("valid");
            contactName.parent().addClass("error");
            contactName.parent().find("span.error").text(errorField[0]).removeClass("hidden");
            errorValue++;

        } else {
            contactName.parent().removeClass("error");
            contactName.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactName.parent().find("span.error").text('');
            }, 200)
            contactName.parent().addClass("valid");
        }
        // validate Subject
        if (!isNumber(contactTel.val()) || contactTel.val().length <= 2) {
            contactTel.parent().addClass("error");
            contactTel.parent().find("span.error").text(errorField[2]).removeClass("hidden");
            errorValue++;
            contactTel.parent().removeClass("valid");
        } else {
            contactTel.parent().removeClass("error");
            contactTel.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactTel.parent().find("span.error").text('');
            }, 200)
            contactTel.parent().addClass("valid");
        }

    }


    function validateForm2(e) {
        let errorValue = 0;
        e.preventDefault();
        const contactCompany = $(".form .form__input-first input");
        const contactDesignation = $(".form .form__input-second input");
        const errorField = [];
        errorField.push('Wrong company', 'Wrong designation');
        if (contactDesignation.val().length <= 2) {
            contactDesignation.parent().removeClass("valid");
            contactDesignation.parent().addClass("error");
            contactDesignation.parent().find("span.error").text(errorField[1]).removeClass("hidden");
            errorValue++;
        } else {
            contactDesignation.parent().removeClass("error");
            contactDesignation.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactDesignation.parent().find("span.error").text('');
            }, 200)
            contactDesignation.parent().addClass("valid");
        }

        if (contactCompany.val().length <= 2) {
            contactCompany.parent().removeClass("valid");
            contactCompany.parent().addClass("error");
            contactCompany.parent().find("span.error").text(errorField[0]).removeClass("hidden");
            errorValue++;
        } else {
            contactCompany.parent().removeClass("error");
            contactCompany.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactCompany.parent().find("span.error").text('');
            }, 200)
            contactCompany.parent().addClass("valid");
        }
        // validate Subject
        if (errorValue == 0) {
            // window.location.href = '/';
            jQuery.ajax({
                type: 'POST',
                url: '/mail.php',
                data: {
                    name: $(".form .form__input-name input").val(),
                    tel: $(".form .form__input-tel input").val(),
                    company: contactCompany.val(),
                    email: $(".form .form__input-mail input").val(),
                    designation: contactDesignation.val()
                },
                success: function (response) {
                    $('.contact__right input').val('');
                    $(".form__wrap").toggleClass("hidden");
                    $(".form__line").addClass("active");
                    $(".form__step span").text('1');
                    step = 1;
                    $('.contact__right.form').css('display','none');
                    $('.contact__right.thank').css('display','block');
                }
            });
        }
        $(".form .form__input input").on("change blur keyup", onFormChange2);

    }

    function onFormChange2(e) {
        let errorValue = 0;
        e.preventDefault();
        const contactCompany = $(".form .form__input-first input");
        const contactDesignation = $(".form .form__input-second input");
        const errorField = [];
        errorField.push('Wrong company', 'Wrong designation');
        if (contactDesignation.val().length <= 2) {
            contactDesignation.parent().removeClass("valid");
            contactDesignation.parent().addClass("error");
            contactDesignation.parent().find("span.error").text(errorField[1]).removeClass("hidden");
            errorValue++;
        } else {
            contactDesignation.parent().removeClass("error");
            contactDesignation.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactDesignation.parent().find("span.error").text('');
            }, 200)
            contactDesignation.parent().addClass("valid");
        }
        if (contactCompany.val().length <= 2) {
            contactCompany.parent().removeClass("valid");
            contactCompany.parent().addClass("error");
            contactCompany.parent().find("span.error").text(errorField[0]).removeClass("hidden");
            errorValue++;
        } else {
            contactCompany.parent().removeClass("error");
            contactCompany.parent().find("span.error").addClass("hidden");
            setTimeout(() => {
                contactCompany.parent().find("span.error").text('');
            }, 200)
            contactCompany.parent().addClass("valid");
        }
    }
})

$(document).ready(function () {

})

$(document).ready(function () {

    if (window.location.pathname == '/') {
        setTimeout(() => {
            $('.fakeLoad').remove();
            $('.preloader').removeAttr('style');
        }, 500)
    }

    setTimeout(() => {
        if (window.location.pathname == '/') {

            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


            if($(window).width()<=625){
                $('.revo__ilustration--3 .big').attr('src', $('.revo__ilustration--3 .big').attr('data-mobile'));
                if(isSafari){
                    $('.comDots').addClass('hidden');
                }
            }

            if ($(window).width() <= 560) {
                $('.preloader .circle #shape').attr('r', '90').attr('cx', '100').attr('cy', '100');
                $('.heron .frfl svg circle').attr('r', '18').attr('cx', '21').attr('cy', '21');
            }

            if ($(window).width() >= 940) {
                for (i = 0; i < 200; i++) {
                    $(' <div class="obj" style="animation-delay: -' + (i * .5) + 's"></div>').appendTo('.spiral');
                }
            } else {
                for (i = 0; i < 200; i++) {
                    $(' <div class="obj" style="animation-delay: -' + (i * .8) + 's"></div>').appendTo('.spiral');
                }
            }

            var video = document.getElementById('videoElm');
            let cursor;
            video.pause();
            let endHeron = false;
            let one = 1;
            let manageAI = false;
            let allRevoSlider = $('.revo__item').length;
            let nextCircle = 120 / allRevoSlider;
            let scrollRev, scrollRev2;
            let animateHeron = false;
            let lastScreen = false;
            $('.revo__status--circle svg:last-child circle').css('stroke-dashoffset', 120 - nextCircle)
            allRevoSlider >= 10 ? $('.revo__status--all').html(allRevoSlider) : $('.revo__status--all').html('0' + allRevoSlider);

            // Index (home) page
            let lasttime = 0, lastduration = 0, angle = 0, countClick = 0, revEnd = 0;
            if (window.location.hash == '#revolutions') {
                $('.mobile__nav--status span i').html('3');
                $('.header').addClass('show');
                $('.heron').addClass('animate  hide off close logotype ');
                resize();
                revEnd = 2;
                rotate(3, $(".heron__one .heron__circle img"));
                $('.mobile__nav').addClass('black');
                setTimeout(()=>{
                    $('.navigation a:nth-child(2)').click();
                },500)
                setTimeout(() => {
                    $('.preloader').addClass('hiddenRevo');
                        $('.heron').addClass('showNext')
                        setTimeout(() => {
                            $('.heron__next').addClass('hide');
                            setTimeout(() => {
                                $('.revo').addClass('show');
                                $('.mobile__nav').addClass('black');
                                $('.revo__dotsRevo').addClass('anim');
                                $('.navigation').addClass('black');
                                $('.navigation a').removeClass('active');
                                $('.navigation a:nth-child(2)').addClass('active');
                                setTimeout(() => {
                                    $('.header').addClass('white');
                                    setTimeout(() => {
                                        $('.heron__next').removeClass('hide');
                                        addParalax($('.revo__ilustration .paralax'));
                                        endHeron = true;
                                        animateHeron = false;
                                    }, 1000)
                                    $(".heron").addClass("closeSection")
                                    scrollPage();
                                }, 500)
                            }, 4500)
                        }, 1500)
                }, 1500)
                }
            else if (window.location.hash == '#revolutions_end') {
                $('.mobile__nav--right').addClass('no-active');
                $('.mobile__nav--left').removeClass('no-active');
                $('.mobile__nav--status span i').html('7');
                $('.header').addClass('show');
                $('.heron').addClass('animate');
                resize();
                scrollPage();
                setTimeout(() => {
                    revEnd = 6;
                    lastScreen = true;
                    rotate(3, $(".heron__one .heron__circle img"));
                    $('.navigation a:nth-child(2)').click();
                }, 100)
                $('.revo').addClass('show');
                $(".heron").addClass("closeSection")
                $('.mobile__nav').addClass('black');
                setTimeout(() => {
                    $('.preloader').addClass('hiddenCircle');
                }, 1000);
            } else {
                setTimeout(() => {
                    $('.preloader').addClass('stroke');
                    setTimeout(() => {
                        $('.preloader').addClass('scale');
                        $('.preloader .circle circle').attr('cx', '40').attr('cy', '40').attr('r', '26');
                        setTimeout(() => {
                            $('.preloader').addClass('logo');
                            setTimeout(() => {
                                $('.preloader').addClass('text');
                                setTimeout(() => {
                                    $('.preloader').addClass('showText');
                                    setTimeout(() => {
                                        $('.preloader').addClass('scaleText');
                                        setTimeout(() => {
                                            $('.preloader__logo path, .preloader__logoText path').attr('fill', '#000000');
                                            $('.header').addClass('show');
                                            $('.heron').addClass('animate');
                                            resize();
                                            setTimeout(() => {
                                                $('.preloader__logo, .preloader__logoText').remove();
                                                rotate(3, $(".heron__one .heron__circle img"));
                                                scrollPage();
                                                addParalax($('.heron__svg .paralax'));
                                                addParalax($('.heron-two .paralax'));
                                            }, 800)
                                        }, 500)
                                    }, 3500)
                                }, 700)
                            }, 400)
                        }, 1000)
                    }, 1500)
                }, 1000)
            }

            function getCenterElement(width) {
                let full = $(window).width();
                return (full - width) / 2;
            }

            function rotate(speed, el) {
                var duration = (speed > 0) ? 50 / speed : 0;
                var currenttime = new Date().getTime() / 1000;
                var difftime = currenttime - lasttime;
                el.removeClass("enable_rotate").show();
                if (!lastduration && duration)
                    el.css("transform", "");
                else
                    angle += (difftime % lastduration) / lastduration;
                if (duration) {
                    el.css("animation-duration", duration + "s")
                        .css("animation-delay", -duration * angle + "s")
                        .addClass("enable_rotate");
                } else
                    el.css("transform", "rotate(" + 360 * angle + "deg)");
                angle -= angle | 0; //use fractional part only
                lasttime = currenttime;
                lastduration = duration;
            }

            function debounce(func, wait, immediate) {
                var timeout;
                return function () {
                    var context = this,
                        args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            }

            function showRevo() {
                animateHeron = true;
                $('.heron-two .paralax').removeAttr('style');
                $(window).unbind('mousemove');
                $('.heron-two, .heron__one').addClass('hide');
                rotate(35, $(".heron-two .heron-two__circle img"));
                setTimeout(() => {
                    $('.heron-two, .heron__one').addClass('off');
                    if ($(window).width() <= 1360 && $(window).width() > 1270) {
                        $('.heron__one .heron__miletus').css('left', '-60px');
                    } else if ($(window).width() <= 1270) {
                        if ($(window).width() <= 560) {
                            $('.heron__one .heron__miletus').css('left', '-85px');
                        } else {
                            $('.heron__one .heron__miletus').css('left', '-45px');
                        }
                    } else {
                        $('.heron__one .heron__miletus').css('left', '-60px');
                    }
                }, 500)
                setTimeout(() => {
                    $('.heron-two__circle img').css('opacity', '0');
                    setTimeout(() => {
                        $('.heron').addClass('close')
                        setTimeout(() => {
                            $('.heron').addClass('logotype')
                            setTimeout(() => {
                                $('.heron').addClass('showNext')
                                setTimeout(() => {
                                    $('.heron__next').addClass('hide');
                                    setTimeout(() => {
                                        $('.revo').addClass('show');
                                        $('.mobile__nav').addClass('black');
                                        $('.revo__dotsRevo').addClass('anim');
                                        $('.navigation').addClass('black');
                                        $('.navigation a').removeClass('active');
                                        $('.navigation a:nth-child(2)').addClass('active');
                                        setTimeout(() => {
                                            $('.header').addClass('white');
                                            setTimeout(() => {
                                                $('.heron').addClass('closeSection');
                                                $('.heron__next').removeClass('hide');
                                                addParalax($('.revo__ilustration .paralax'));
                                                endHeron = true;
                                                animateHeron = false;
                                            }, 1000)
                                        }, 500)
                                    }, 3000)
                                }, 1500)
                            }, 500)
                        }, 200)
                    }, 300)
                }, 1000)
                countClick++;
            }

            function showOneHero(item = 2) {
                $('.heron__svg .paralax').removeAttr('style');
                $(window).unbind('mousemove');
                $('.heron').addClass('hide');
                addParalax($('.heron-two .paralax'));
                rotate(35, $(".heron__one .heron__circle img"));
                $('.heron-two__circle img').css('opacity', '1');
                $('.heron').addClass('off');
                let elementCont = $('.heron .container').offset().left;
                let parseLeft = parseInt($('.heron__one .heron__miletus').css('left').split('px')[0]);
                if ($(window).width() <= 1400 && $(window).width() > 1360 ) {
                    $('.heron__one .heron__miletus').css('left', '-' + (getCenterElement(150) - elementCont - parseLeft) + 'px').attr('data-left', '-' + (getCenterElement(150) - elementCont - parseLeft));
                }
                else if ($(window).width() <= 1350 && $(window).width() > 1270) {
                    $('.heron__one .heron__miletus').css('left', '-' + (getCenterElement(115) - elementCont - parseLeft) + 'px').attr('data-left', '-' + (getCenterElement(115) - elementCont - parseLeft));
                } else if ($(window).width() <= 1270) {
                    $('.heron__one .heron__miletus').css('left', '-' + (getCenterElement(170) - elementCont - parseLeft) + 'px').attr('data-left', '-' + (getCenterElement(170) - elementCont - parseLeft));
                } else {
                    $('.heron__one .heron__miletus').css('left', '-' + (getCenterElement(175) - elementCont - parseLeft) + 'px').attr('data-left', '-' + (getCenterElement(175) - elementCont - parseLeft));
                }
                rotate(50, $(".heron__one .heron__circle img"));
                $('.heron-two').addClass('animate');
                $('.heron__one .heron__circle img').css('opacity', '0');
                rotate(3, $(".heron-two .heron-two__circle img"));
                $('.heron-two .paralax').removeAttr('style');
                $(window).unbind('mousemove');
                $('.heron-two, .heron__one').addClass('hide');
                rotate(35, $(".heron-two .heron-two__circle img"));
                $('.heron-two, .heron__one').addClass('off');
                if ($(window).width() <= 1360 && $(window).width() > 1270) {
                    $('.heron__one .heron__miletus').css('left', '-60px');
                } else if ($(window).width() <= 1270) {
                    $('.heron__one .heron__miletus').css('left', '-45px');
                } else {
                    $('.heron__one .heron__miletus').css('left', '-60px');
                }
                $('.heron-two__circle img').css('opacity', '0');
                $('.heron').addClass('close logotype')
                if (revEnd == 6) {
                    revEnd = 6;
                    showLastRevo();
                }
                countClick = revEnd;
                revEnd = 2;

            }

            function nextScreenHero() {
                if (countClick == 0) {
                    $('.mobile__nav--left').removeClass('no-active');
                    $('.heron__svg .paralax').removeAttr('style');
                    $(window).unbind('mousemove');
                    $('.heron').addClass('hide');
                    addParalax($('.heron-two .paralax'));
                    rotate(35, $(".heron__one .heron__circle img"));
                    $('.heron-two__circle img').css('opacity', '1');
                    setTimeout(() => {
                        $('.heron').addClass('off');
                        let elementCont = $('.heron .container').offset().left;
                        let parseLeft = parseInt($('.heron__one .heron__miletus').css('left').split('px')[0]);
                        if ($(window).width() <= 1400 && $(window).width() > 1360 ) {
                            $('.heron__one .heron__miletus').css('left', '-' + (getCenterElement(150) - elementCont - parseLeft) + 'px').attr('data-left', '-' + (getCenterElement(150) - elementCont - parseLeft));
                        }
                        else if ($(window).width() <= 1350 && $(window).width() > 1270) {
                            $('.heron__one .heron__miletus').css('left', '-' + (getCenterElement(115) - elementCont - parseLeft) + 'px').attr('data-left', '-' + (getCenterElement(115) - elementCont - parseLeft));
                        }
                        else if ($(window).width() <= 1270) {
                            $('.heron__one .heron__miletus').css('left', '-' + (getCenterElement(170) - elementCont - parseLeft) + 'px').attr('data-left', '-' + (getCenterElement(170) - elementCont - parseLeft));
                        }
                        else {
                            $('.heron__one .heron__miletus').css('left', '-' + (getCenterElement(175) - elementCont - parseLeft) + 'px').attr('data-left', '-' + (getCenterElement(175) - elementCont - parseLeft));
                        }
                        rotate(50, $(".heron__one .heron__circle img"));
                        setTimeout(() => {
                            $('.heron-two').addClass('animate');
                            setTimeout(() => {
                                $('.heron__one .heron__circle img').css('opacity', '0');
                                rotate(3, $(".heron-two .heron-two__circle img"));
                            }, 500)
                        }, 500);
                    }, 200);
                    countClick++;
                } else if (countClick == 1) {
                    if (!animateHeron) {
                        showRevo();
                    }
                } else {
                    if (endHeron) {
                        nextRevoSlide();
                    }
                }
            }

            function nextRevoSlide() {
                endHeron = false;
                $('.revo__elipse').addClass('rotate');

                if (one < allRevoSlider) {
                    if (one == 4) {
                        $('.mobile__nav--right').addClass('no-active');
                        $('.spiral__bg').addClass('show');
                    }else{
                        $('.mobile__nav--right').removeClass('no-active');
                    }
                    $('.revo__item:nth-child(' + one + ')').addClass('hide');
                    $('.revo__elipse').css('transform', 'rotate(' + (one * 15) + 'deg) translate(' + (one * 10) + '%, 0)').css('left', -25 + (one * 10) + '%').css('top', -50 - (one * 10) + '%');
                    one++;
                    $('.revo__item:nth-child(' + one + ')').hasClass('noCircle') ? $('.revo__circleRevo').addClass('hide') : $('.revo__circleRevo').removeClass('hide');
                    $('.revo__item:nth-child(' + one + ')').addClass('active');
                    $('.revo__status--circle svg:last-child circle').css('stroke-dashoffset', 120 - (nextCircle * one));
                    one >= 10 ? $('.revo__status--cur').html(one) : $('.revo__status--cur').html('0' + one);
                    countClick++;
                    clearTimeout(scrollRev)
                    scrollRev = setTimeout(() => {
                        endHeron = true;
                    }, 1000)
                } else {
                    clearTimeout(scrollRev2)
                    scrollRev2 = setTimeout(() => {
                        endHeron = true;
                    }, 1000)
                    if (manageAI) {
                        $('body').addClass('hideRevo');
                        $('.mobile__nav').addClass('hide');
                        setTimeout(() => {
                            window.location = '/service.html';
                        }, 1500)
                    }
                }
            }

            function showLastRevo() {
                $('.revo').addClass('show');
                $('.mobile__nav').addClass('black');
                $('.revo__dotsRevo').addClass('anim');
                $('.navigation').addClass('black');
                $('.navigation a').removeClass('active');
                $('.navigation a:nth-child(2)').addClass('active');
                $('.header').addClass('white');
                // $('.heron').addClass('closeSection');
                addParalax($('.revo__ilustration .paralax'));
                endHeron = true;
                one = 4;
                $('.spiral__bg').addClass('show');
                $('.revo__elipse').css('transform', 'rotate(' + (one * 15) + 'deg) translate(' + (one * 10) + '%, 0)').css('left', -25 + (one * 10) + '%').css('top', -50 - (one * 10) + '%');
                one++;
                $('.revo__circleRevo').addClass('hide');
                $('.revo__item').addClass('active');
                $('.revo__item:not(:last-child)').addClass('hide');
                $('.revo__status--circle svg:last-child circle').css('stroke-dashoffset', 120 - (nextCircle * one));
                one >= 10 ? $('.revo__status--cur').html(one) : $('.revo__status--cur').html('0' + one);
            }


            $('.revo__ilustration--text').on('click', function (event) {
                $(this).css('pointer-events', 'none');
                $(this).attr('extra-text', $(this).find('span').html());
                event.preventDefault();
                $('.revo__ilustration .planet').addClass('hidePlanet');
                $('.revo__ilustration--text span').animate(
                    {width: '100%'},
                    {
                        duration: 1500,
                        step: function (now, fx) {
                            if (fx.prop == 'width') {
                                $(this).html(parseInt(Math.round(now * 100) / 100) + '%');
                                $('.mobile__nav--right').removeClass('no-active');
                            }
                        }
                    }
                );

                $('.revo__progress circle').css('stroke-dashoffset', 80);

                setTimeout(() => {
                    $('.revo__ilustration--5 .big, .revo__ilustration--5 .planet').css('transition', '0.5s').css('opacity', '0')
                    $('.revo__ilustration--5').addClass('hideCircle');
                    setTimeout(() => {
                        $('.revo__ilustration--5 .big').attr('src', $('.revo__ilustration--5 .big').attr('extra-src')).css('opacity', '1');
                        $('.videoElm').addClass('show');
                        setTimeout(() => {
                            $('.revo__ilustration--text').css('opacity', 0).css('transition-delay','0s');
                            video.play();
                            setTimeout(() => {
                                $('.revo__ilustration--text').css('transition-delay','1s');
                            }, 500)
                        }, 100)
                        manageAI = true;
                    }, 600)

                }, 1600)
            })

            $('.home .mobile__nav--right').on('click', function (event) {
                nextScreenHero();
                $('.mobile__nav--status span i').html(countClick + 1);
                $('*').animate({scrollTop: 0}, 500);
            })

            $('.home .mobile__nav--left').on('click', function (event) {
                prevScreenHero();
                $('.mobile__nav--status span i').html(countClick + 1);
                $('*').animate({scrollTop: 0}, 500);
            })

            function scrollPage() {
                var onScroll = debounce(function (direction) {
                    if (direction == false) {
                        cursorAnimate()
                        nextScreenHero();
                    } else if (direction == true) {
                        cursorAnimate()
                        prevScreenHero();
                    }
                }, 300, true);

                $(window).bind('wheel', function (e) {
                    var delta;
                    if (event.wheelDelta) {
                        delta = event.wheelDelta;
                    } else {
                        delta = -1 * event.deltaY;
                    }
                    if ($(window).width() >= 992) {
                        onScroll(delta >= 0);
                    }
                });
            }


            function prevScreenHero() {
                if (countClick == 1) {
                    $('.mobile__nav--left').addClass('no-active');
                    addParalax($('.heron__svg .paralax'));
                    $('.heron').removeClass('hide off');
                    $('.heron__miletus').removeAttr('style');
                    $('.heron').addClass('resetTransition');
                    $('.heron__one .heron__circle:not(.frfl) img').css('opacity', '1');
                    rotate(3, $(".heron__one .heron__circle img"));
                    $('.heron-two__circle img').css('opacity', '0');
                    setTimeout(() => {
                        $('.heron').removeClass('resetTransition');
                    }, 1000)
                    $('.heron-two').removeClass('animate');
                    countClick--;
                } else if (countClick == 2) {
                    if (!animateHeron) {
                        $('.heron-two__hands').css('transition', '0s');
                        $('.heron').removeClass('close logotype showNext closeSection');
                        $('.heron-two__hands').removeAttr('style');
                        $('.heron-two').removeClass('hide off');
                        $('.heron-two__hands').css('transform', 'scale(.3) ').css('transition-delay', '0s');
                        $('.heron__one .heron__miletus').css('left', $('.heron__one .heron__miletus').attr('data-left') + 'px');
                        rotate(3, $(".heron-two .heron-two__circle img"));
                        $('.heron__one').removeClass('hide off');
                        $('.heron-two__circle img').css('opacity', '1');
                        setTimeout(() => {
                            setTimeout(() => {
                                $('.heron-two__hands').removeAttr('style');
                            }, 100)

                            $('.header').removeClass('white');
                            $('.revo').removeClass('show');
                            $('.mobile__nav').removeClass('black');
                            $('.revo__dotsRevo').removeClass('anim');
                            $('.navigation').removeClass('black');
                            $('.navigation a').removeClass('active');
                            $('.navigation a:nth-child(1)').addClass('active');
                            addParalax($('.heron-two .paralax'));
                        }, 500);
                        endHeron = false;
                        countClick--;
                    }
                } else if (one <= allRevoSlider && one != 1 && !$('.videoElm').hasClass('show')) {
                    $('.mobile__nav--right').removeClass('no-active');
                    $('.spiral__bg').removeClass('show');
                    $('.revo__item:nth-child(' + one + ')').removeClass('active');
                    one--;
                    $('.revo__circleRevo').removeClass('hide');
                    $('.revo__ilustration').removeAttr('style');
                    $('.revo__item:nth-child(' + one + ')').addClass('prev');
                    setTimeout(() => {
                        $('.revo__item:nth-child(' + one + ')').removeClass('hide');
                        $('.revo__status--circle svg:last-child circle').css('stroke-dashoffset', 120 - (nextCircle * one));
                        one >= 10 ? $('.revo__status--cur').html(one) : $('.revo__status--cur').html('0' + one);
                    }, 10)
                    setTimeout(() => {
                        $('.revo__item:nth-child(' + one + ')').removeClass('prev')
                    }, 1200);
                    countClick--;
                } else if (one <= allRevoSlider && one != 1 && $('.videoElm').hasClass('show')) {
                    $('.mobile__nav--right').addClass('no-active');
                    $('.revo__ilustration .videoElm').removeClass('show');
                    $('.revo__ilustration--5 .big').attr('src', $('.revo__ilustration--5 .big').attr('original-src'));
                    $('.revo__ilustration .planet').removeClass('hidePlanet');
                    $('.revo__ilustration--text, .revo__ilustration--5 .big, .revo__ilustration--5 .planet').removeAttr('style');
                    $('.revo__ilustration--text span').html($('.revo__ilustration--text span').attr('extra-text'));
                    $('.revo__ilustration--5').removeClass('hideCircle');
                    manageAI = false;
                }
            }

            function addParalax(element) {
                let plusMinus = 1;
                $(element).each(function (item, index) {
                    plusMinus = plusMinus == 1 ? -1 : 1;
                    $(this).attr('koef', plusMinus);
                })

                if ($(window).width() >= 992) {
                    $(window).on('mousemove', function (event) {
                        $(element).each(function (item, index) {
                            let el = $(this);
                            let ee = parseInt($(this).attr('koef'));
                            let coef = $(this).width() / 300;
                            transX = (event.pageX / $(window).width() * 10) * ee * coef;
                            transY = (event.pageY / $(window).height() * 10) * ee * coef;
                            if (el.parents('div').hasClass('heron__miletus')) {
                                $('.paralaxE').css('transform', 'translateX(' + transX.toFixed(1) + 'px) translateY(' + transY.toFixed(1) + 'px)');
                            }
                            el.css('transform', 'translateX(' + transX.toFixed(1) + 'px) translateY(' + transY.toFixed(1) + 'px)');
                        });

                    });
                }
            }

            cursorAnimate();

            function cursorAnimate(item = false) {
                let time = item ? 3000 : 15000;
                clearTimeout(cursor);
                cursor = setTimeout(() => {
                    $('.mouse').addClass('animateMouse');
                    setTimeout(() => {
                        $('.mouse').removeClass('animateMouse');
                        cursorAnimate(true);
                    }, 5000)
                }, time)
            }

            function resize() {
                let ww = $(window).width();
                let containerPad = parseInt($('.header .container').css('width').split('px')[0]);
                let nav = (ww - containerPad) / 2;
                let pad = parseInt($('.header .container').css('padding-right').split('px')[0]);
                $('.navigation').css('right', (nav + pad) + 'px');
            }

            $(window).on('resize', function () {
                resize();
            })

            $('.navigation a').on('click', function (event) {
                $('.navigation').addClass("disable")
            })
            $('.navigation a:nth-child(2)').on('click', function (event) {
                if (!lastScreen) {
                    revEnd = 2;
                    countClick = 2;
                }
                lastScreen = true;
                $(window).unbind('mousemove');
                // $('.revo').addClass('show');
                $('.mobile__nav').addClass('black');
                $('.revo__dotsRevo').addClass('anim');
                $('.navigation a').removeClass('active');
                $('.navigation a:nth-child(2)').addClass('active');

                if (!lastScreen) {
                    setTimeout(() => {
                        setTimeout(() => {
                            endHeron = true;
                            setTimeout(() => {
                                showOneHero();
                                addParalax($('.revo__ilustration .paralax'));
                            }, 100)
                        }, 1000)
                    }, 500)
                }
                else {
                    endHeron = true;
                    showOneHero();
                    addParalax($('.revo__ilustration .paralax'));
                }
                setTimeout(() => {
                    $('.heron').addClass('showNext')
                    setTimeout(() => {
                        $('.heron__next').addClass('hide');
                        setTimeout(() => {
                            $('.revo').addClass('show');
                            $('.mobile__nav').addClass('black');
                            $('.revo__dotsRevo').addClass('anim');
                            $('.navigation').addClass('black');
                            $('.navigation a').removeClass('active');
                            $('.navigation a:nth-child(2)').addClass('active');
                            setTimeout(() => {
                                $('.header').addClass('white');
                                setTimeout(() => {
                                    // $('.heron').addClass('closeSection');
                                    $('.heron__next').removeClass('hide');
                                    addParalax($('.revo__ilustration .paralax'));
                                    endHeron = true;
                                    animateHeron = false;
                                }, 1000)
                                $(".heron").addClass("closeSection")
                            }, 500)
                        }, 4500)
                    }, 1500)
                }, 500)
                setTimeout(()=>{
                    $('.navigation').removeClass("disable")
                },7000)

            });

            $('.navigation a:nth-child(1)').on('click', function (event) {
                $('.mobile__nav--left').addClass('no-active');
                addParalax($('.heron__svg .paralax'));
                $('.heron').removeClass('hide off closeSection close showNext logotype');
                $('.heron__miletus').removeAttr('style');
                $('.heron').addClass('resetTransition');
                $('.heron__one .heron__circle:not(.frfl) img').css('opacity', '1');
                rotate(3, $(".heron__one .heron__circle img"));
                $('.heron-two__circle img').css('opacity', '0');
                $('.heron-two, .heron__one').removeClass('hide off animate')
                setTimeout(() => {
                    $('.heron').removeClass('resetTransition');
                    $(".heron").removeClass("closeSection")
                }, 1000)
                countClick = 0;
                setTimeout(() => {
                    $('.header').removeClass('white');
                    $('.revo').removeClass('show');
                    $('.mobile__nav').removeClass('black');
                    $('.revo__dotsRevo').removeClass('anim');
                    $('.navigation').removeClass('black');
                    $('.navigation a').removeClass('active');
                    $('.navigation a:nth-child(1)').addClass('active');
                    setTimeout(() => {
                        $('.revo__item').removeClass('active hide');
                        $('.revo__item:nth-child(1)').addClass('active');
                        one = 1;
                        $('.revo__status--circle svg:last-child circle').css('stroke-dashoffset', 120 - (nextCircle * one));
                        $('.revo__status--cur').html('01');
                        $('.revo__ilustration .videoElm').removeClass('show');
                        $('.revo__ilustration--5 .big').attr('src', $('.revo__ilustration--5 .big').attr('original-src'));
                        $('.revo__ilustration .planet').removeClass('hidePlanet');
                        $('.revo__ilustration--text, .revo__ilustration--5 .big, .revo__ilustration--5 .planet').removeAttr('style');
                        $('.revo__ilustration--text span').html($('.revo__ilustration--text span').attr('extra-text'));
                        $('.revo__circleRevo').removeClass('hide');
                    }, 300)
                }, 200);
                    $('.heron').removeClass("showNext")
                    $('.heron__next').removeClass('hide');
                setTimeout(()=>{
                    $('.navigation').removeClass("disable")
                },2000)
            })


            $('.menu .menu__nav a:nth-child(2)').on('click', function (event){
                $('.navigation a:nth-child(2)').click();
                setTimeout(()=>{
                    $('.header__burger').click();
                    $('.header').removeClass('menuRev')
                }, 400)
            })


        }
    }, 450);


})

$(document).ready(function () {

    let scrollServ = false;
    let countScroll = 1;
    let firstSlide = true;
    var onScrollFirst = null;
    let countTouch = 0;
    let countSlide = 8;
    changeSlide = true;
    if ($(window).width() <= 1024) {
        $('.services-body').addClass('ovhide');
    }

    if ($(".service").length != 0) {
        $('.hideBlack').removeClass('hidden');
        $('body').addClass('show');
        let sliderSwiperLength = $(".service__list").children().length;
        let slideEnd = true;
        $(".service__count > span:last-child > span:last-child").text('0' + sliderSwiperLength);

        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 2,
            speed: 1500,
            centeredSlides: true,
            mousewheel: true,
            allowTouchMove: false,
            breakpoints: {
                256: {
                    slidesPerView: 1
                },
                1025: {
                    slidesPerView: 1.75,
                },
                1280: {
                    slidesPerView: 2,
                },
            }

        });

        swiper.on('slideChangeTransitionEnd', function () {
            if (swiper.isEnd) {
                swiper.mousewheel.disable();
                relocate();
                changeSlide = false;
            }
        });

        swiper.on('slidePrevTransitionStart', function () {
            slideEnd = false;
        });

        swiper.on('slidePrevTransitionEnd', function () {
            slideEnd = true;
        });


        swiper.on('slideChange', function () {
            let idx = swiper.realIndex + 1;
            let realIdx = '0' + parseInt(idx)
            $(".service__count > span:first-child").text(realIdx);
            changeSlide = true;
            countSlide = 12 - (3-idx);
            $('.mobile__nav--status span i').html(countSlide);
        });


        function relocate() {
            if ($(window).width() > 1024) {
                $(window).on("wheel", (e) => {
                    if (e.originalEvent.deltaY >= 0) {
                        $('.hideBlack').addClass('white hidden');
                        setTimeout(() => {
                            window.location.href = '/team.html';
                        }, 1000)
                    } else {
                        swiper.mousewheel.enable();
                        $(window).unbind("wheel");
                        startScroll();
                    }
                })
            } else {
                // $(window).on("touchmove", () => {
                //     window.location.href = '/team.html';
                // })
            }

        }

        var onScroll = debounce(function (direction) {
            if (direction == true && slideEnd) {
                if ($(window).width() >= 1024) {
                    if ($('.service__list>div:nth-child(1)').hasClass('swiper-slide-active')) {
                        $(".image-first , .image-second").removeClass("levit");
                        $(".service__wrapper").removeClass("service-visible");
                        $('body').addClass('ovhide');
                        $(".service__screen").removeClass("hidden");
                        $(window).unbind("wheel");
                        $(window).width() <= 625 ? $('.service').css('min-height', '840px') : '';
                        countScroll = 3;
                        firstScreen();
                    }
                }
            }
        }, 100, true);

        function startScroll() {
            $(window).bind('wheel', function (e) {
                var delta;
                if (event.wheelDelta) {
                    delta = event.wheelDelta;
                } else {
                    delta = -1 * event.deltaY;
                }
                onScroll(delta >= 0);
            });
        }


        function firstScreen(cont = true) {
            if (cont) {
                setTimeout(() => {
                    $(".service__screen").addClass("visible");
                    setTimeout(() => {
                        $(".service__screen").addClass("circle-transform");
                        scrollServ = true;
                    }, 500);
                }, 700);
            }

            $(window).bind('wheel', function (e) {
                var delta;
                if (event.wheelDelta) {
                    delta = event.wheelDelta;
                } else {
                    delta = -1 * event.deltaY;
                }

                scrollServ ? onScrollFirst(delta >= 0) : '';
            });

            onScrollFirst = debounce(function (direction) {
                scrollFunc(direction)
            }, 100, true);

        }


        function scrollFunc(direction) {
            if (countScroll == 3) {
                countScroll = 2;
            } else {
                if (direction == true) {
                    if (firstSlide && countScroll != 2) {
                        $('.hideBlack').removeClass('white');
                        $('.hideBlack').addClass('white hidden');
                        setTimeout(() => {
                            window.location.href = '/#revolutions_end';
                        }, 1000)
                    }
                    countTouch = 0;
                    countScroll = 1;
                    firstSlide = true;
                    $('.service__screen').removeClass('hideOne');
                    countSlide = 8;
                    $('.mobile__nav--status span i').html(countSlide);

                } else {
                    if (countScroll == 1) {
                        $('.service__screen').addClass('hideOne');
                        countScroll = 2;
                        firstSlide = false;
                        countTouch = 2;
                        countSlide = 9;
                        $('.mobile__nav--status span i').html(countSlide);
                    } else {
                        $(window).unbind("wheel");
                        $(".service__screen").addClass("hidden");
                        $(window).width() <= 625 ? $('.service').css('min-height', '840px') : '';
                        setTimeout(() => {
                            $(".image-first , .image-second").addClass("levit");
                            setTimeout(() => {
                                $('body').removeClass('ovhide');
                                $(".service__wrapper").addClass("service-visible");
                                onScrollFirst = null;
                                countSlide = 10;
                                $('.mobile__nav--status span i').html(countSlide);
                            }, 300)
                        }, 800)

                        startScroll();
                        countScroll = 1;
                        countTouch = 3;
                    }
                }
            }
        }

        if (window.location.hash == '#services_last') {
            swiper.slideTo(2);
            countTouch = 3;
            countSlide = 12;
            $('.mobile__nav--status span i').html(countSlide);
            $(window).width() <= 625 ? $('.service').css('min-height', '840px') : '';
        }

        if (window.location.hash == '#services_last') {
            $('.hideBlack').addClass('white')
            swiper.slideTo(2);
            $(".image-first , .image-second").addClass("levit");
            $(".service__screen").addClass("hidden");
            setTimeout(() => {
                $('body').removeClass('ovhide');
                $(".service__screen").addClass("circle-transform hideOne visible hidden");
                $(".service__wrapper").addClass("service-visible");
            }, 1000)
            countScroll = 3;
            startScroll()
        } else {
            firstScreen();
        }

        // firstScreen();

        // if ($(window).width() < 1024) {
        //     $(".service__item").swipe({
        //         swipeLeft: function (event, direction, distance, duration, fingerCount) {
        //             swiper.slideNext();
        //         },
        //         threshold: 75
        //     });
        // }

        $('.services-body .mobile__nav--right').on('click', function (event) {
            $('*').animate({scrollTop: 0}, 500);
            if (countTouch == 3) {
                swiper.slideNext();
                if (!changeSlide) {
                    $('.hideBlack').addClass('white hidden');
                    setTimeout(() => {
                        window.location.href = '/team.html';
                    }, 1000)
                }
            } else {
                scrollFunc(false);
            }
        })
        $('.services-body .mobile__nav--left').on('click', function (event) {
            $('*').animate({scrollTop: 0}, 500);
            if (countTouch == 3) {
                if ($('.service__list>div:nth-child(1)').hasClass('swiper-slide-active')) {
                    $(".image-first , .image-second").removeClass("levit");
                    $(".service__wrapper").removeClass("service-visible");
                    $('body').addClass('ovhide');
                    $(".service__screen").removeClass("hidden");
                    $(window).width() <= 625 ? $('.service').removeAttr('style') : '';
                    countTouch = 2;
                    countScroll = 2;
                    countSlide = 9;
                    $('.mobile__nav--status span i').html(countSlide);
                } else {
                    swiper.slidePrev();
                }
            } else {
                scrollFunc(true);
            }

        })
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }


    let Swidth = $(".service__img").innerWidth();
    let Sheight = $(".service__img").innerHeight();
    $('.service__first-circle--left').css('--var-width', `${Swidth + 'px'}`);
    $('.service__first-circle--left').css('--var-height', `${Sheight + 'px'}`);


});

$(document).ready(function () {
    let functStartPrev = false;
    let firstTime = true;

    if ($(".team").length != 0) {
        $('.hideBlack').removeClass('hidden');
        setTimeout(() => {
            $(".team").addClass("anim-on")
        }, 500)
        let countSlide = 13;
        $('.mobile__nav--status span i').html(countSlide);

        var w = $(window).width();
        var h = $(window).height();
        var threshold = 10
        $(window).resize(function () {
            widthDiff = Math.abs($(window).width() - w);
            heightDiff = Math.abs($(window).height() - h);
            if (widthDiff < threshold && heightDiff < threshold) return;
            w = $(window).width();
            h = $(window).height();

            $(window).resize(function () {
                location.reload();
            });
        });



        function relocateContact() {
            if ($(window).width() > 1024) {
                $(window).on("wheel", (e) => {
                    if (e.originalEvent.deltaY >= 0) {
                        $(".team").addClass("anim-hidden");
                        setTimeout(() => {
                            $(".team").addClass("anim-all-hidden");
                            $('.hideBlack').addClass('hidden');
                            setTimeout(() => {
                                window.location.href = '/contact.html';
                            }, 700)
                        }, 1100)
                    } else {
                        prevSlide();
                        $(window).unbind('wheel')
                        $(window).on('wheel', scrollFunction);
                    }
                })
            } else {
                // $(window).on("touchmove", function () {
                    $(".team").addClass("anim-hidden")
                    setTimeout(() => {
                        $(".team").addClass("anim-all-hidden");
                        $('.hideBlack').addClass('hidden');
                        setTimeout(() => {
                            window.location.href = '/contact.html';
                        }, 500)
                    }, 1000)
                // })
            }
        }

        setTimeout(() => {
            firstTime = false
        }, 2300)

        if ($(window).width() >= 1025) {


            var onScroll = debounce(function (direction) {
                if (direction == false) {
                    if (!firstTime) {
                        if (!functStartPrev) {
                            nextSlide()
                            functStartPrev = true;
                            setTimeout(() => {
                                functStartPrev = false;
                            }, 3000)
                        }
                    }
                } else if (direction == true) {
                    if (!firstTime) {
                        if (!functStartPrev) {
                            prevSlide()
                            functStartPrev = true;
                            setTimeout(() => {
                                functStartPrev = false;
                            }, 3000)
                        }
                    }
                }
            }, 100, true);

            $(window).bind('wheel', function (e) {
                var delta;
                if (event.wheelDelta) {
                    delta = event.wheelDelta;
                } else {
                    delta = -1 * event.deltaY;
                }
                onScroll(delta >= 0);
            });

        }

        function debounce(func, wait, immediate) {
            var timeout;
            return function () {
                var context = this,
                    args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        // text to span
        const labels = document.querySelectorAll('.team__job');

        labels.forEach((item) => {
            item.innerHTML = item.innerText.split('').reduce((res, char) => `${res}<span>${char}</span>`, '');
        })

        $(".team__job span").each(function (index, item) {
            if ($(this).text().indexOf(' ') !== -1) {
                $(this).addClass("white-space");
            }
        })

        //slider
        let translateWidth = 0,
            slideNow = 1,
            slideCount = $(".team__list").children().length;

        function nextSlide() {
            if (slideNow == slideCount) {
                slideNow = slideCount;
                relocateContact();
            } else {
                setTimeout(() => {
                    $(".team__change--left").addClass("hidden");
                }, 500)
                setTimeout(() => {
                    $(".team__change--left").removeClass("hidden");
                    $(".team__circle-mini span").toggleClass("active");
                }, 2200)
                translateWidth = -$('.team__item').width() * (slideNow);
                $(".team__item").addClass("hidden");
                $(".team__bubbles").addClass("hidden")
                setTimeout(() => {
                    $(".team__item").eq(slideNow - 1).removeClass("hidden");
                    $('.team__list').css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    $(".team__bubbles").removeClass("hidden")
                }, 1500)
                countSlide = countSlide + slideNow;
                $('.mobile__nav--status span i').html(countSlide);
                slideNow++;
            }
        }

        function prevSlide() {
            if (slideNow <= 1) {
                slideNow = 1;
                // if ($(window).width() >= 1024) {
                setTimeout(()=>{
                    window.location = '/service.html#services_last';
                }, 400);
                    $('.hideBlack').addClass('hidden');
                // }
            } else {
                setTimeout(() => {
                    $(".team__change--left").addClass("hidden");
                }, 500)
                setTimeout(() => {
                    $(".team__change--left").removeClass("hidden");
                    $(".team__circle-mini span").toggleClass("active");
                }, 2200)
                translateWidth = -$('.team__item').width() * (slideNow - 2);
                $(".team__item").addClass("hidden");
                $(".team__bubbles").addClass("hidden")
                setTimeout(() => {
                    $(".team__item").eq(slideNow - 1).removeClass("hidden");
                    $(".team__bubbles").removeClass("hidden")
                    $('.team__list').css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                }, 1500);
                slideNow--;
                countSlide = countSlide - slideNow;
                $('.mobile__nav--status span i').html(countSlide);
            }
        }


        if ($(window).width() < 1024) {
            // $(".team__item").swipe({
            //     swipeLeft: function (event, direction, distance, duration, fingerCount) {
            //         nextSlide();
            //     },
            //     threshold: 75
            // });
            // $(".team__item").swipe({
            //     swipeRight: function (event, direction, distance, duration, fingerCount) {
            //         prevSlide();
            //     },
            //     threshold: 75
            // });
        }

        if (window.location.hash == '#team_last') {
            setTimeout(() => {
                $(".team__change--left").addClass("hidden");
            }, 50)
            setTimeout(() => {
                $(".team__change--left").removeClass("hidden");
                $(".team__circle-mini span").toggleClass("active");
            }, 200)
            translateWidth = -$('.team__item').width() * (slideNow);
            $(".team__item").addClass("hidden");
            $(".team__bubbles").addClass("hidden")
            setTimeout(() => {
                $(".team__item").eq(slideNow - 1).removeClass("hidden");
                $('.team__list').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                $(".team__bubbles").removeClass("hidden")
            }, 150)
            countSlide = 13 + slideNow;
            $('.mobile__nav--status span i').html(countSlide);
            slideNow++;
        }

        $('.team-body .mobile__nav--right').on('click', function (event) {
            nextSlide();
            $('*').animate({scrollTop: 0}, 500);
        })
        $('.team-body .mobile__nav--left').on('click', function (event) {
            prevSlide();
            $('*').animate({scrollTop: 0}, 500);
        })

    }

})

/*** Mouse hover parallax */
document.addEventListener("mousemove", parallax);
function parallax(event) {
  this.querySelectorAll(".mouse").forEach((shift) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 160;
    const y = (window.innerHeight - event.pageY * position) / 160;

    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}





/*** Accordion  */

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


/*** popup ***/

setTimeout(function() {
    $("#a").css("display","block");
     $("#b").css("display","block");
}, 3000);

$(".cancel").click(function(){
     $("#a").fadeOut();
     $("#b").fadeOut();
});

$(document).ready( async function() {   

    if (window.ethereum) {        
        try {
            // request change chain
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x38' }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                const data = [window.NETWORKS.BINANCE_SMART_CHAIN]

                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: data,
                });
                } catch (addError) {
                // handle "add" error
                }
            }
        // handle other "switch" errors
        }                     
    } else {
        alert('Cannot find Metamask in your browser. Make sure you have installed it.')
    }
 });