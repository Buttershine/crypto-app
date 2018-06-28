var axios = require('axios');
// var fetch = require('fetch');

export function getRequest(url){
  return axios.get(url);
}

function getUserInfo(username){
  return axios.get('https://api.github.com/users/' + username);
}
// export function fetchRequest(url) {
//     fetch('/api/crypto/info')
//         .then(res => res.json())
//         .then(data => {
//             var tempCrypto = [];
//             var tempBI = []
//             for (var prop in data.Data) {
//                 if (data.Data[prop].SortOrder <= 20)
//                     tempCrypto.push(data.Data[prop]);
//                 if (data.Data[prop].SortOrder == 1)
//                     tempBI.push(data.Data[prop]);
//             }
//             this.setState({cryptos: tempCrypto, currentBigInfo: tempBI});
//         })
// }
var helpers = {
  getGithubInfo: function(username){
    return axios.all([getRequest(), getUserInfo(username)])
      .then(function(arr){
        return {
          repos: arr[0].data,
          bio: arr[1].data
        }
      })
  }
}