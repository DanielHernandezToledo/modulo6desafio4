const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'pgadmin',
  port: 5432,
  database: 'likeme',
  allowExitOnIdle: true
})


const mostrarPosts = async () => {
  try {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
  } catch (error) {
    return error;
  }

}


const crearPost = async (titulo, img, descripcion) => {
  try {
    const result = await pool.query('INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (Default, $1, $2, $3, $4)', [titulo, img, descripcion, 0]);
    return result;
  } catch (error) {
    throw error;
  }

}


const likePost = async (id) => {
  try {
    const result = await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = $1', [id]);
    return result;
  } catch (error) {
    throw error;
  }
}

const borrarPost = async (id) => {
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    return result;
  } catch (error) {
    throw error;
  }

}

module.exports = {
  mostrarPosts,
  crearPost,
  likePost,
  borrarPost
}