const http =require('http');

const server=http.createServer((req,res) => {
    if (req.url === '/'){
     res.write('helloWorld')
     res.end()
    }
    if (req.url === '/api/cources'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.listen(3000)

console.log('Listening at port 3000.....')