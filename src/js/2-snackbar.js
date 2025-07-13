import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", createNotification);

function createNotification(event) {
    event.preventDefault();

    const isSuccess = event.target.state.value;
    const delay = event.target.delay.value.trim();

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess.trim() === "fulfilled") {
                iziToast.success({
                    position:  'topRight',
                    message: `Fulfilled promise in ${delay}ms`
                });
                resolve(`Fulfilled promise in ${delay}ms`
)
            } else {
                iziToast.error({
                    position:  'topRight',
                    message: `Rejected promise in ${delay}ms`
                });
                reject(`Rejected promise in ${delay}ms`);
            }
        }, `${delay}`);
    });

    promise
    .then(value => console.log(value))
        .catch(error => console.log(error));
    form.reset();
};