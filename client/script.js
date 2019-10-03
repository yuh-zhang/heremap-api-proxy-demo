(function () {
    document.getElementById('autocomplete-input').addEventListener('keyup', (ele) => {
        document.getElementById('autocomplete-control').classList.add('is-loading');
        debounce(remoteCall, 1000)(ele.target.value);
    })

    async function remoteCall(input) {
        document.getElementById('dropdown-content').innerHTML = '';
        document.getElementById('dropdown-menu').classList.add('is-hidden');
        var response = await fetch(`/api/autocomplete/${input}`)
        console.log(response)
        var responseJson = await response.json()
        console.log(responseJson)
        responseJson.suggestions.forEach(item => {
            document.getElementById('dropdown-content').insertAdjacentHTML('beforeend', `<a href="#" onClick="setInputValue(this)" class="dropdown-item">
            ${item.label}
          </a>`)
        });
    }

    var inDebounce
    const debounce = (func, delay) => {
        return function () {
            const context = this
            const args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }
    var inThrottle
    const throttle = (func, limit) => {
        return function () {
            const args = arguments
            const context = this
            if (!inThrottle) {
                func.apply(context, args)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    }
}());