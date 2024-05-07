const Template = require("../models/template");

let selectedValue = 0;

exports.postTempSelection = (req, res, next) => {
  selectedValue = req.body.value;
  console.log(selectedValue);
  res.redirect("/add-template");
};

exports.getDetails = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("details", {
    errorMessage: message,
    editing: false,
  });
};

exports.postDetails = (req, res, next) => {
  const productName = req.body.productName;
  const tagline = req.body.tagline;
  const description = req.body.description;
  const ctaTitle = req.body.cta;
  const ctaRedirect = req.body.link;
  const imageOneTitle = req.body.imageOneTitle;
  let imageOne = req.body.fileUrl1;
  const imageTwoTitle = req.body.imageTwoTitle;
  let imageTwo = req.body.fileUrl2;
  const imageThreeTitle = req.body.imageThreeTitle;
  let imageThree = req.body.fileUrl3;
  const companyName = req.body.companyName;
  const phone = req.body.phone;
  const email = req.body.email;
  const backlink = req.body.backlink;

  if (!imageOne) {
    imageOne = "/assets/image_1.png";
  }

  if (!imageTwo) {
    imageTwo = "/assets/image_2.png";
  }

  if (!imageThree) {
    imageThree = "/assets/image_3.png";
  }

  Template.findOne({ backlink: backlink })
    .then((templateIndex) => {
      if (templateIndex) {
        console.log(templateIndex);
        req.flash("error", "Backlink already exists");
        return res.redirect("/add-template");
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
        templateName: selectedValue,
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
    })
    .catch((err) => console.log(err));
};

exports.getTemplate = (req, res, next) => {
  const backlink = req.params.backlink;
  Template.findOne({ backlink: backlink })
    .then((template) => {
      if (!template) {
        return res.status(404).render("404");
      }

      let editTemplate = false;

      if (req.session.user._id.toString() === template.userId.toString()) {
        editTemplate = true;
      }

      console.log(editTemplate);

      if (template.templateName == 1) {
        res.render("templateOne", {
          template: template,
          editing: editTemplate,
        });
      } else if (template.templateName == 2) {
        res.render("templateTwo", {
          template: template,
          editing: editTemplate,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditDetails = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const templateId = req.params.templateId;
  Template.findById(templateId)
    .then((template) => {
      if (!template) {
        return res.redirect("/");
      }

      res.render("details", {
        editing: editMode,
        template: template,
        errorMessage: message,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditDetails = (req, res, next) => {
  const templateId = req.body.templateId;
  const UpdatedproductName = req.body.productName;
  const Updatedtagline = req.body.tagline;
  const Updateddescription = req.body.description;
  const UpdatedctaTitle = req.body.cta;
  const UpdatedctaRedirect = req.body.link;
  const UpdatedimageOneTitle = req.body.imageOneTitle;
  const UpdatedimageOne = req.body.fileUrl1;
  const UpdatedimageTwoTitle = req.body.imageTwoTitle;
  const UpdatedimageTwo = req.body.fileUrl2;
  const UpdatedimageThreeTitle = req.body.imageThreeTitle;
  const UpdatedimageThree = req.body.fileUrl3;
  const UpdatedcompanyName = req.body.companyName;
  const Updatedphone = req.body.phone;
  const Updatedemail = req.body.email;
  const Updatedbacklink = req.body.backlink;

  Template.findById(templateId)
    .then((template) => {
      template.productName = UpdatedproductName;
      template.tagline = Updatedtagline;
      template.ctaTitle = UpdatedctaTitle;
      template.ctaRedirect = UpdatedctaRedirect;
      template.imageOneTitle = UpdatedimageOneTitle;
      template.imageOneURL = UpdatedimageOne;
      template.imageTwoTitle = UpdatedimageTwoTitle;
      template.imageTwoURL = UpdatedimageTwo;
      template.imageThreeTitle = UpdatedimageThreeTitle;
      template.imageThreeURL = UpdatedimageThree;
      template.description = Updateddescription;
      template.companyName = UpdatedcompanyName;
      template.phone = Updatedphone;
      template.email = Updatedemail;
      template.backlink = Updatedbacklink;
      return template.save();
    })
    .then((result) => {
      console.log("UPDATED TEMPLATE");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
