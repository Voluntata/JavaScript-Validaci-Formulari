let id = (id) => document.getElementById(id);
let errorMsg = document.getElementsByClassName("invalid-feedback");

let form = id("myFormId"),
    inputUserName = id("inputUserName"),
    inputEmail = id("inputEmail"),
    inputPassword = id("inputPassword"),
    inputPassRepeat = id("inputPassRepeat"),
    inputProvince = id("inputProvince"),
    inputCity = id("inputCity"),
    inputZip = id("inputZip"),
    gridCheck = id("gridCheck");


const isRequired = value => value === "" ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test(password);
};
const isZipValid = (zip) => {
    const re = /\d{5}/;
    return re.test(zip);
}
const checkUserName = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const userName = inputUserName.value.trim();
    if (!isRequired(userName)) {
        document.getElementById('errorUserName').innerText = 'Username no puede estar vacio';
        inputUserName.classList.add('is-invalid');

    }
    else if (!isBetween(userName.length, min, max)) {
        document.getElementById('errorUserName').innerText = `Username debe contener mas de ${3} simbolos`;
        inputUserName.classList.add('is-invalid');

    }
    else {
        inputUserName.classList.remove('is-invalid')
        inputUserName.classList.add("is-valid");
        valid = true;
    }
}

const checkEmail = () => {
    let valid = false;
    const email = inputEmail.value.trim();
    if (!isRequired(email)) {
        document.getElementById('errorEmail').innerText = 'Email no puede estar vacio';
        inputEmail.classList.add('is-invalid');

    }
    else if (!isEmailValid(email)) {
        document.getElementById('errorEmail').innerText = 'Email no cumple el formato';
        inputEmail.classList.add('is-invalid');

    }
    else {
        inputEmail.classList.remove('is-invalid')
        inputEmail.classList.add("is-valid");
        valid = true;
    }
}

const checkPassword = () => {
    let valid = false;

    const password = inputPassword.value.trim();
    if (!isRequired(password)) {
        document.getElementById('errorPassword').innerText = 'Contraseña no puede estar vacia';
        inputPassword.classList.add('is-invalid')
    }
    else if (!isPasswordSecure(password)) {
        document.getElementById('errorPassword').innerText = 'Debe tener minimo 8 caracteres, una minuscua, una mayuscula y un numero';
        inputPassword.classList.add('is-invalid')
    }
    else {
        inputPassword.classList.remove('is-invalid')
        inputPassword.classList.add("is-valid");
        valid = true;
    }
}

const checkPassRepeat = () => {
    let valid = false;
    const passRepeat = inputPassRepeat.value.trim();
    const password = inputPassword.value.trim();

    if (!isRequired(passRepeat)) {
        document.getElementById('errorPassRepeat').innerText = 'Repite la contraseña';
        inputPassRepeat.classList.add('is-invalid')
    }
    else if (password !== passRepeat) {
        document.getElementById('errorPassRepeat').innerText = 'Contraseña no coincide';
        inputPassRepeat.classList.add('is-invalid')
    }
    else {
        inputPassRepeat.classList.remove('is-invalid')
        inputPassRepeat.classList.add("is-valid");
        valid = true;
    }
}

const checkZip = () => {
    let valid = false;
    const zip = inputZip.value.trim();
    if (!isRequired(zip)) {
        document.getElementById('errorZip').innerText = 'Codigo postal no puede estar vacio';
        inputZip.classList.add('is-invalid');
    }
    else if (!isZipValid(zip)) {
        document.getElementById('errorZip').innerText = 'Codigo postal no cumple el formato';
        inputZip.classList.add('is-invalid');
    }
    else {
        inputZip.classList.remove('is-invalid');
        inputZip.classList.add("is-valid");
        valid = true;
    }
}

const checkAgree = () => {
    let valid = false;
    if (!gridCheck.checked) {
        document.getElementById('errorCheck').innerText = 'Acepta las bases';
        gridCheck.classList.add('is-invalid');
    }
    else {
        gridCheck.classList.remove('is-invalid');
        gridCheck.classList.add("is-valid");
        valid = true;
    }
}

const debounce = (fn, delay = 250) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isUserNameValid = checkUserName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isPassRepeatValid = checkPassRepeat(),
        isZipValid = checkZip(),
        isCheckValid = checkAgree();



    let isFormValid = isUserNameValid && isEmailValid && isPasswordValid && isPassRepeatValid && isZipValid && isCheckValid;
    if (isFormValid) {

    }
})

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'inputUserName':
            checkUserName();
            break
        case 'inputEmail':
            checkEmail();
            break;
        case 'inputPassword':
            checkPassword();
            break;
        case 'inputPassRepeat':
            checkPassRepeat();
            break;
        case 'inputZip':
            checkZip();
            break;
        case 'gridCheck':
            checkAgree();
            break;
    }
}));
