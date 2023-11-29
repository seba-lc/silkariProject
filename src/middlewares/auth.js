const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token){
    res.status(201).json({
      ok: false,
      message: 'Token not valid'
    })
    return
  }
  try {
    const {id} = jwt.verify(token, process.env.S_WORD);
    if(!id){
      res.status(201).json({
        ok: false,
        message: 'Token not valid'
      });
      return
    }
    req.id = id;
    next();
  } catch (error) {
    console.log(error.message);
    if(error.message === 'jwt expired'){ //CHECKEAR QUE ESE SEA EL MENSAJE DE VUELTA
      res.status(201).json({
        message: 'Token expired'
      })
    }
    res.status(500).json({
      message: 'Error in the server'
    })
  }
}