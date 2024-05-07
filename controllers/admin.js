const Template = require("../models/template");

exports.postTempSelection = (req, res, next) => {
  const selectedValue = req.body.value;
}

exports.getDetails = (req, res, next) => {
  res.render("details");
};

exports.postDetails = (req, res, next) => {
  const productName = req.body.productName;
  const tagline = req.body.tagline;
  const description = req.body.description;
  const ctaTitle = req.body.cta;
  const ctaRedirect = req.body.link;
  const imageOneTitle = req.body.imageOneTitle;
  let imageOne = req.body.fileUrl1
  const imageTwoTitle = req.body.imageTwoTitle;
  let imageTwo = req.body.fileUrl2;
  const imageThreeTitle = req.body.imageThreeTitle;
  let imageThree = req.body.fileUrl3;
  const companyName = req.body.companyName;
  const phone = req.body.phone;
  const email = req.body.email;
  const backlink = req.body.backlink;

  // console.log(imageOne);
  // const imageOneURL = imageOne.path;

  if(!imageOne) {
    imageOne = '/assets/image_1.png';
  }

  if(!imageTwo) {
    imageTwo = '/assets/image_2.png';
  }

  if(!imageThree) {
    imageThree = '/assets/image_3.png';
  }

  const template = new Template({
    productName: productName,
    tagline: tagline,
    description: description,
    ctaTitle: ctaTitle,
    ctaRedirect: ctaRedirect,
    imageOneURL: imageOne,
    imageOneTitle: imageOneTitle,
    imageTwoURL: imageTwo,
    imageTwoTitle: imageTwoTitle,
    imageThreeURL: imageThree,
    imageThreeTitle: imageThreeTitle,
    companyName: companyName,
    phone: phone,
    email: email,
    backlink: backlink,
    userId: req.user,
  });

  template
    .save()
    .then((result) => {
      console.log("Template created");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getTemplate = (req, res, next) => {
    const backlink = req.params.backlink;
    Template.findOne({backlink: backlink}).then(template => {
        if (!template) {
          return res.status(404).render('404');
        }
        res.render('templateOne', {
            template: template
        })
    }).catch(err => {
      console.log(err);
    });
}
