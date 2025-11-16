import { Meteor } from "meteor/meteor"
import "../imports/api/collections"
import "../imports/api/methods"
import "../imports/api/publications"
import "./seed"

Meteor.startup(() => {
  console.log("Meteoric Garden Shop server started")
})
