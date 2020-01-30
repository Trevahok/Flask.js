import * as url from 'url';

/*
for a pattern list of = 
[
    '/',
    '/home',
    '/home/<name>',
    '/a/123'
]

urlpatterns = {
    '':{
    '': function root ,
    'home': {
       '': function home,
       '<name>':{
            '' : function using_name,

       } 
    },
    'a': {
        '123': {
            '' : function using_123,
        }
    }
    }


}

*/

function urlToPath(u) {
    var pathname = url.parse(u).pathname.split('/')
    return pathname;
}

function insert(urlpatterns, list, funct) {

    if (list.length == 0) return { ...urlpatterns, ...{ '': funct } }

    var temp = list.shift()

    if (urlpatterns == undefined)
        return { [temp]: insert(urlpatterns, list, funct) }

    return { ...urlpatterns, [temp]: insert(urlpatterns[temp], list, funct) }

}

function _searchUrl(list, urlpatterns) {
    if(list.length == 0 && !('' in urlpatterns) ) return null;
    var top = list.shift()
    if( !( top in urlpatterns)) return null;
    if( list.length == 0 ){
        if( !( '' in urlpatterns[top])) return null;

        return urlpatterns[top]['']
    }


    return _searchUrl(list, urlpatterns[top])
}

export function searchUrl( ur , urlpatterns){
    return  _searchUrl( urlToPath(ur), urlpatterns);
}

export function insertUrl(u, urlpatterns, funct) {
    return insert(urlpatterns, urlToPath(u), funct)
}


// var urlpatterns = {}
// var urls_to_add = [
//     ['/', 'root'],
//     ['/home/', 'home'],
//     ['/home/<name>/', 'name'],
//     ['/a/123/', 'rand'],
// ]

// for (let u of urls_to_add) {
//     console.log(u)
//     urlpatterns = insertUrl(u[0], urlpatterns, u[1])
// }

// // var suffix_tree = insert( {}, 'banana'.split('') , Math.random() *10 )  
// //  suffix_tree = insert( suffix_tree, 'bann'.split('') , Math.random() *10 )  

// // console.log( JSON.stringify(urlpatterns, null , 2  ) )

// console.log(
//     _searchUrl(
//         urlToPath('/home'),
//         urlpatterns
//     )
// )
