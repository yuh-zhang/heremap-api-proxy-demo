(function () {
    document.getElementById('autocomplete-input').addEventListener('keyup', (ele) => {
        debounce(remoteCall,300)(ele.target.value);
    })

    async function remoteCall(input) {
        document.getElementById('dropdown-content').innerHTML = '';
        var response = await fetch(`http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=31gDSjonTUSDLYb1yTXA&app_code=yfhY1MLeAHqfVBqQHv7UHQ&query=${input}&maxresults=5&country=AUS`)
        var responseJson = await response.json();
        responseJson.suggestions.forEach(item => {
            document.getElementById('dropdown-content').insertAdjacentHTML('beforeend', `<a href="#" class="dropdown-item">
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