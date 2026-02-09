import Article from '../models/articleSchema.js';

//Création d'un article
export const createArticle = async (req, res) => {

    try{

        const {title, content} = req.body;
         
        const newArticle = new Article({

            title,
            content

        });

        const savedArticle = await newArticle.save();

        res.status(200).json(savedArticle);

    }catch(err){

        return res.status(500).json({message: 'Erreur Serveur', err})       

    }

};


// Récupération d'un article par son ID
export const getArticleById = async (req, res) => {

    try{

        const id = req.params.id;

        const article = await Article.findOne({_id: id});

        if(!article){
            return res.status(404).json({message: 'Article non trouvé'});
        }

        res.status(200).json(article);


    }catch(err){

        return res.status(500).json({message: 'Erreur Serveur', err})       

    }

};


export const showAllArticle = async (req, res) => {

try{

        const allArticles = await Article.find().sort({ _id: -1 });

        if(!allArticles){
            return res.status(404).json({message: 'Article non trouvé'});
        }

        res.status(200).json(allArticles);

    }catch(err){

        return res.status(500).json({message: 'Erreur Serveur', err})       

    }
};

// Mettre à jour la donnée d'un article
export const updateArticle = async (req, res) => {

    try{ 

        const updateArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if(!updateArticle){
            return res.status(404).json({message: 'Article non trouvé'});
        }

        res.status(200).json(updateArticle);

    }catch(err){

        return res.status(500).json({message: 'Erreur Serveur', err})       

    }
};

// Supprimer un article
export const deleteArticle = async (req, res) => {

    try{ 
        const deleteArticle = await Article.findByIdAndDelete(
            req.params.id, 
        );

        if(!deleteArticle){
            return res.status(404).json({message: 'Artcle non trouvé'});
    }
        res.status(200).json({message: 'Article supprimé avec succès'});
}catch(err){

        return res.status(500).json({message: 'Erreur Serveur', err})
    }
};



//j'ai essayé de faire une recherche ou par l'id ou par le titre avec l'aide de l'ia mais j'ai rien compris mdr
        /*const { id } = req.params;
        const { title } = req.query;

        if (id) {
            const article = await Article.findById(id).lean();
            if (!article) {
                return res.status(404).json({ message: 'Article non trouvé' });
            }
            return res.status(200).json(article);
        }

        const filter = {};
        if (title) {
            filter.title = new RegExp(title, 'i');
        }

        const articles = await Article.find(filter).sort({ _id: -1 }).lean();
        return res.status(200).json(articles);*/

//j'ai essayé de faire une recherche par titre (pas ia) ça marche plus ou moins mdr
        /*const {title} = req.query;

        const article = await Article.find({title});

        if(!article){
            return res.status(404).json({message: 'Article non trouvé'});
        }

        res.status(200).json(article);*/ 

//JAI UN CRUD (Create, Read, Update, Delete) COMPLET POUR LES ARTICLES MDRRR
