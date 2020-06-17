var host = 'ipapi.co'

Vue.filter('dateformat',
  function (value) {

    if (!value) return

    return moment.duration(new Date() - new Date(value)).humanize() + ' 전'

})

Vue.filter('typeformat',
  function (type) {

    if (!type) return

    switch(type) {
        case 1 : return 'first'
        case 2 : return 'second'
        default: 'none'
    }

})

function CardComponent(el, type, date) {

    console.log(type, date)

  return {
    el: el,
    data: {
        type: type,
        date: date,
        myIP: '0.0.0.0',
        accessToken: null
    },
    methods: {
        getType: function () {
            
            return this.type

        },
        getDate: function () {

            return this.date

        },
        getMyIp: function () {

            return this.myIP

        },
        setMyIp: function (ip) {

            this.myIP = ip

        },
        setAccessToken: function (accessToken) {

            this.accessToken = accessToken

        },
        onAlert: function() {
            Swal.fire({
                icon: 'error',
                title: '버튼',
                text: '버튼 텍스트',
                showCancelButton: true,
                confirmButtonColor: '#7151FC',
                cancelButtonColor: '#343A40',
                confirmButtonText: '등록',
                cancelButtonText: '취소'
            })
            .then(function(res) {

                if (res.value) console.log(res.value)

            })
        },
        submitForm:  function () {

            var self = this

            this.fetch('https://' + host + '/json', {
                method: 'GET'
            })
            .then(function (data) {

                console.log(data)

                self.setMyIp(data.ip)

            })

        },
        fetch: function (url, options) {

            if (!options) options = {}
            else if (!options.headers) options.headers = {}   
            else if (!options.headers['Authorization']) _.extend(options.headers, { 'Authorization': 'Bearer ' + this.accessToken })

            return fetch(url, options).then(function (res) {

                if (res.ok) return res.json()

                throw new Error()

            })
        }
    },
  }

}