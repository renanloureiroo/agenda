exports.index = (req, res) => {
  res.render("contato")
}

exports.register = async (req, res) => {
  try{
    const contato = new Contato(req.body)
  }
}