const handler = async (req, res) => {
  return res.end(JSON.stringify({ 'result': req.body.variantID }));
}

export default handler; 
