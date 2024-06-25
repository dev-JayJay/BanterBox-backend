
const RegisterUser = (req, res) => {
    res.send("Reistration Route Called");
    console.log();("Reistration Route Called");
};
const LoginUSer = (req, res) => {
    res.send("Login Route Called");
    console.log();("Login Route Called");
};

module.exports = { RegisterUser, LoginUSer };