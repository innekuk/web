const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const template = require('./template.js')

app.get('/', (req, res) => { // 메인 창
    let {name} = req.query 
    fs.readdir('page',(err,files)=>{
        let list = template.list(files)
        fs.readFile(`page/${name}`, 'utf-8', (err,data)=>{
            let control = `<a href="create">생성</a> <a href="/update?name=${name}">수정</a>
            <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${name}">    
            <button type="submit">삭제</button>
            </form>
            `
            if(name === undefined){
                name = 'NBA'
                data = '농구선수 데이터'
                control = `<a href="/create">생성</a>`
            }
            const html = template.HTML(name,list, `<h2>${name} 페이지</h2><p>${data}</p>`,control)
        res.send(html)
        })
    })
})
app.get('/create', (req, res) => { // 새롭게 페이지를 추가 할때
    fs.readdir('page',(err,files)=>{
        const name = 'create'
        const list = template.list(files) //page에 있는 파일들을 읽어와서 리스트로 만든다
        const data = template.create() // template에 있는 create html을 받아와
        const html = template.HTML(name, list, data, ``) // 최종 html로 합친다
        res.send(html)
    })
})

const qs = require('querystring')
app.post('/create_process', (req, res)=> {//create버튼 클릭시
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body) // 받아온 데이터를 title과 description으로 분류한다
        const title = post.title
        const description = post.description
        fs.writeFile(`page/${title}`, description, 'utf8', (err)=>{ // 파일을 받아와서 값을 넣고 그 창을 연다
            res.redirect(302, `/?name=${title}`)
        })
    })
})
app.get('/update', (req, res) => {//새롭게 업데이트를 할때
    let {name} = req.query
    fs.readdir('page',(err,files)=>{
        let list = template.list(files)
        fs.readFile(`page/${name}`, 'utf-8', (err,content)=>{
            let control = `<a href="create">생성</a> <a href="/update?name=${name}">수정</a>
            <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${name}">    
            <button type="submit">삭제</button>
            </form>
            `
            const data = template.update(name , content) // 받아온 이름과 내용에 맞는 update html을 받아온다
            const html = template.HTML(name,list, `<h2>${name} 페이지</h2><p>${data}</p>`,control)
        res.send(html)
        })
    })
})
app.post('/update_process', (req, res)=> { // 업데이트 연산시
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        const title = post.title
        const description = post.description
        fs.rename(`page/${id}`,`page/${title}` , (err) =>{ // id로 되어있는 파일이름을 title로 바꾸고
            fs.writeFile(`page/${title}`, description, 'utf8', (err)=>{ // 바뀐 파일 안에 내용도 바꾼다
                res.redirect(302, `/?name=${title}`)
            })
        })
    })
})

app.post('/delete_process', (req, res)=> {//delete버튼 클릭시
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body) // 받아온 데이터를 title과 description으로 분류한다
        const id = post.id
        fs.unlink(`page/${id}`, (err)=>{ // 파일을 받아와서 값을 넣고 그 창을 연다
            res.redirect(302, `/`)
        })
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})