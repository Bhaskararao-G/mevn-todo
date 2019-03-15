const Todo = require('../models/Todo');

module.exports = {
  async save (req, res) {
    console.log('--------- saving todo --------')
    await Todo.create(req.body, (err, data)=> {
    console.log(data) 
      if (!err) {
        res.json({
          status: "success",
          message: "Todo added successfully",
          data: data
        })
      }
    })
  },
  async fetch (req, res) {
    console.log('--------- get all todos --------')
    await Todo.find((err, data)=> {
      if (!err) {
        res.json({
          status: "success",
          message: "Todos fetched successfully",
          data: data
        })
      } else {
        res.json({
          status: "fail",
          message: "Something went wrong"
        })
      }
    })
  },
  async delete (req, res) {
    console.log('--------- delete todo by id --------')
    await Todo.deleteOne({ _id: req.body.id }, (err, data) => {
      if (!err) {
        res.json({
          status: "success",
          message: "Todo deleted successfully"
        })
      } else {
        res.json({
          status: "fail",
          message: "Something went wrong"
        })
      }
    })
  },
}