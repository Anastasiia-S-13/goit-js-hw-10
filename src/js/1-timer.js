import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btn = document.querySelector(".start");

class Timer {
    constructor(selector) {
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
        flatpickr(document.querySelector(selector), options);
    };

    // start() {
    //     const selectedTime = this.userSelectedDate;
    //     const currentTime = Date.now();

    //     setInterval(() => {
    //         const deltaTime = selectedTime - currentTime;
    //     }, 1000);
    //     console.log(deltaTime);
    // }
};

const time = new Timer("#datetime-picker");
console.log(time);