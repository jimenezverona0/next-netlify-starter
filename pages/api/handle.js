const handler = async (req, res) => {
  return res.end(JSON.stringify({'result': 'hola'}));
}

export default handler; 
