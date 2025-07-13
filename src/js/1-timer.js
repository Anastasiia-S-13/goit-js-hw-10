import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector(".start");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

class Timer {
    constructor(selector) {
        this.isActive = false;
        this.userSelectedDate = null;
        const options = {
            enableTime: true,
            time_24hr: true,
            altInput: true,
            altFormat: 'd M Y H:i',
            dateFormat: 'Y-m-d H:i',
            defaultDate: new Date(),
            minuteIncrement: 1,
            onClose: (selectedDates) => {
                console.log(selectedDates[0]);
                this.userSelectedDate = selectedDates[0];
            },
        };
        flatpickr("#datetime-picker", options);
    };

    start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        const selectedTime = this.userSelectedDate?.getTime();

        const currentTime = Date.now();
        if (!selectedTime || selectedTime < currentTime) {
            iziToast.warning({
                position:  'topCenter',
                message: 'Please choose a date in the future'
            });
        } else {
            this.timerId = setInterval(() => {
            const startTime = Date.now();
            const deltaTime = selectedTime - startTime;
                if (deltaTime <= 0) {
                    clearInterval(this.timerId);
                    updateClockFace(this.convertMs(0));
                    this.isActive = false;
                    return;
                };
                const time = this.convertMs(deltaTime);
                updateClockFace(time);
                console.log(time);
            }, 1000);
        }
    };

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.pad(Math.floor(ms / day));
        const hours = this.pad(Math.floor((ms % day) / hour));
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    };

    pad(value) {
        return String(value).padStart(2, "0");
    }
};

const time = new Timer();
btn.addEventListener("click", time.start.bind(time));

function updateClockFace({ days, hours, minutes, seconds }) {
    dataDays.textContent = `${days}`;
    dataHours.textContent = `${hours}`;
    dataMinutes.textContent = `${minutes}`;
    dataSeconds.textContent = `${seconds}`;
};