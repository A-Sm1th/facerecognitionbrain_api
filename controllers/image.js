const Clarifai = require('clarifai'); 
const app = new Clarifai.App({
    apiKey: 'b6d492e521e8456f8553dd28bebbce90'
  });

const handleApiCall= (req,res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.statis(400).json('unable to work with the API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db.select('*').from('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then (entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};