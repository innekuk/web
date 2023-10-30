module.exports = {
    HTML:function(name, list, body,control){ // 받아온 값들을 구성있는 html로 합치는 함수
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name}</title>
        </head>
        <body>
            <h1><a href="/">nba 농구 선수</a></h1>
            ${list}
            ${control}
            ${body}
        </body>
        </html>
        `
    }, 
    list:function(files){//파일들의 이름이 담겨있는 변수를 받아 리스트 html로 바꿔주는 함수
        let list = '<ol>'
            for(i=0;i<files.length;i++){
                list = list + `<li><a href="?name=${files[i]}">${files[i]}</a></li>`
            }
        list = list + '</ol>'
        return list
    },
    create:function(){//create와 관련된 html을 가져오는 함수
        return `
        <form action="/create_process" method="post">
            <p><input type="text", name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><button type="submit">작성</button></p>
        </form>
        `
    },
    update:function(name , contant){//update와 관련된 html을 가져오는 함수
        return `
        <form action="/update_process" method="post">    
            <p><input type="hidden", name="id" value="${name}"></p>
            <p><input type="text", name="title" placeholder="title" value="${name}">></p>
            <p><textarea name="description" placeholder="description">${contant}</textarea></p>
            <p><button type="submit">작성</button></p>
        </form>
        `
    }
} 