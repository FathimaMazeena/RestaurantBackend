
//TODO IMAGE UPLOAD TO BE DONE LATER

//add new image to the gallery
router.post('/upload', async (req, res) => {
    try {
        const offer = await Offer.create(req.body);
        res.status(201).json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Error adding offer', error: error.message });
    }
});

//delete an image from the gallery


//view image gallery by user


//update gallery tags, category, order, visibility, description and title by admin
router.put('/images/:id', (req, res)=>{
    Image.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Image.findOne({_id:req.params.id}).then(function(image){
            res.send(image);
        });
        
    });
});


