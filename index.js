import jsonServer from 'json-server';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const server = jsonServer.create();
const router = jsonServer.router('db.json');
server.use(cors());
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.delete('/mindmap', async (req, res) => {
        try {
                const { id } = req.body;
                const db = router.db;
                let mindmap = await db.get('mindmap').value();
                for (let i = 0; i < id.length; i++) {
                        mindmap = await db.get('mindmap').remove({ id: id[i] }).
write();
                }
                return res.json({
                        status: 200,
                        message: 'Mindmap deleted',
                });
        } catch {
                return res.json({
                        status: 400,
                        message: 'Bad request',
                });
        }
});
server.use(router);
const port = process.env.PORT || 1234;
server.listen(port, () => {
        console.log('App listening on post: ' + port);
});
