const namePage = async (req, res) => {
    const name = 'Knight L'
    res.render('index', {title : name})
};

export { namePage };