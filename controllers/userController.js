module.exports = {
    test: async (req, res) => {
        res.status(200).json({message: "User Works!"})
    }
}