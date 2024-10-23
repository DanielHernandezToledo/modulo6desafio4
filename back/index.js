var express = require('express')
var cors = require('cors')
var app = express()

const { mostrarPosts, crearPost, likePost, borrarPost } = require('./consultas')

app.use(cors())
app.use(express.json())

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})

app.get('/posts', async (req, res) => {
  await mostrarPosts().then(posts => {
    if (posts.name !== 'error') {
      res.status(200).send(posts);
      return
    } else {
      res.status(500).send('error al obtener los datos');
      return
    }
  })
})

app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion } = req.body
  await crearPost(titulo, img, descripcion).then(post => {
    if (post.name !== 'error') {
      res.status(200).send(post);
      return;
    } else {
      res.status(500).send('error al agregar post');
      return;
    }
  })
})

app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params
  const { likes } = req.body
  likePost(id, likes).then(post => {
    if (post.name !== 'error') {
      res.status(200).send(post);
      return;
    } else {
      res.status(500).send('error modificando el post');
      return;
    }
  })
})

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params
  borrarPost(id).then(post => {
    if (post.name !== 'error') {
      res.status(201).send(post);
      return;
    } else {
      res.status(500).send('error al eliminar el post');
      return;
    }
  })
})