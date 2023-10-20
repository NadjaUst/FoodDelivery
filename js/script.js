window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items")

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    // Timer

    const deadline = '2023-12-31';

    function getTimeRemaining(endtime) {

        let days, hours, minutes, seconds;

        const total = Date.parse(endtime) - Date.parse(new Date());

        days = total <= 0 ? 0 : Math.floor(total / (1000 * 60 * 60 * 24)),
        hours = total <= 0 ? 0 : Math.floor((total / (1000 * 60 * 60) % 24)),
        minutes = total <= 0 ? 0 : Math.floor((total / 1000 / 60) % 60),
        seconds = total <= 0 ? 0 : Math.floor((total / 1000) % 60);

               
        return {
            total,
            days,
            hours,
            minutes,
            seconds 
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds')
         
        const timeInterval = setInterval(updateClock, 1000)

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <=0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline); 

    // Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModalWindow() {
        clearTimeout(modalTimerId);
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModalWindow() {
        modal.classList.remove('show'); 
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach( (item) => {
        item.addEventListener('click', openModalWindow)
    });

    modalCloseBtn.addEventListener('click', closeModalWindow);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalWindow();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        }
    });

    const modalTimerId = setTimeout(openModalWindow, 6000);

    function showModalByScroll() {
        if ((window.scrollY + document.documentElement.clientHeight) >= (document.documentElement.scrollHeight - 1) ) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);


})