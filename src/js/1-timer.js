import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector(".chose-date")
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");
const btn = document.querySelector(".start");
btn.disabled = true;

class Timer {
    constructor(selector) {
        this.isActive = false;
        this.userSelectedDate = null;
        this.selectedTime = null;
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
                const currentTime = Date.now();
                const selectedTime = this.userSelectedDate?.getTime();

                if (selectedTime && selectedTime > currentTime) {
                    btn.disabled = false;
                } else {
                    btn.disabled = true;
                     iziToast.error({
                position:  'topCenter',
                message: 'Please choose a date in the future'
            });
                }
            },
        };
        this.picker = flatpickr(input, options);
    };

    start() {
        if (this.isActive) {
            return;
        };

        this.isActive = true;
        btn.disabled = true;
        this.picker.altInput.disabled = true;

        const currentTime = Date.now();
        const selectedTime = this.userSelectedDate?.getTime();

        if (!selectedTime || selectedTime < currentTime) {
            this.isActive = false;
            iziToast.warning({
                position: 'topCenter',
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
                    btn.disabled = false;
                    this.picker.altInput.disabled = false;
                    return;
                };
                const time = this.convertMs(deltaTime);
                updateClockFace(time);
                console.log(time);
            }, 1000);
        }
    }

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