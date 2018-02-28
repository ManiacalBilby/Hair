# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Appointment.destroy_all
Stylist.destroy_all
Client.destroy_all

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

amanda = Stylist.create(
  first_name: "Amanda",
  last_name: "McDonald",
  photo_url: "http://thecollectiveasalon.com/wp-content/uploads/2014/10/amanda.jpg",
  email: "alwestmcdonald@yahoo.com",
  password: "password"
)

jennifer = Stylist.create(
  first_name: "Jennifer",
  last_name: "Stills",
  photo_url: "https://static.boredpanda.com/blog/wp-content/uploads/2015/12/honest-selfie-hairstylist-ursula-goff-9.jpg",
  email: "jenniferstills@gmail.com",
  password: "password",
)

doris = Client.create(
  first_name: "Doris",
  last_name: "Green",
  phone_number: "770-123-4567",
  formula: "Base/Redken Shades EQ equal parts 05C and 04NB; Midshaft and Ends/06CB and Dimensional Highlights/Redken Chromatics 10GI 20 volume.",
  notes: "Weekly shampoo and blowout",
  photo_url: "http://onehair.com.au/wp-content/uploads/2017/12/IMG_20171201_105520-e1513925227792.jpg",
  email: "jenna424@hotmail.com"
)

samantha = Client.create(
  first_name: "Samantha",
  last_name: "James",
  phone_number: "770-321-7654",
  formula: "Goldwell Oxycur Platin Dust Free Bleach + 30-volume developer",
  notes: "Platinum blonde every 3 weeks",
  photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3JIphBePTCFVuS0HlDr5R7f8RI5g_HTtbwbSMwjekChk0XNo",
  email: "forgivenessha@yahoo.com"
)

karen = Client.create(
  first_name: "Karen",
  last_name: "Post",
  phone_number: "770-231=6745",
  formula: "Formula 1.- Natural Level 6- 6RC 1 ½ oz. 7CR 1 oz. 6BC ½ oz orange concentrate ¼ oz red concentrate ¼ oz gold concentrate ¼ oz 30 volume crème developer",
  notes: "Frequent color changer",
  photo_url: "https://s-media-cache-ak0.pinimg.com/originals/8e/1c/93/8e1c93fda5f87cbe0d3b1924706f53cb.jpg",
  email: "karenpost@yahoo.com"
)

Appointment.create(
  stylist: amanda, 
  client: doris, 
  start_time: "15:00:00",
  start_date: "2018-03-01",
  duration: 60,
  comments: "Just shampoo and blowout."
)

Appointment.create(
  stylist: amanda, 
  client: doris, 
  start_time: "15:00:00",
  start_date: "2018-03-08",
  duration: 120,
  comments: "Cut and color",
)

Appointment.create(
  stylist: jennifer,
  client: samantha,
  start_time: "19:00:00",
  start_date: "2018-03-22",
  duration: 80,
  comments: "Trim and touch up roots",
)

Appointment.create(
  stylist: jennifer,
  client: karen,
  start_time: "08:00:00",
  start_date: "2018-03-13",
  duration: 120,
  comments: "Cut and color(red)"
)

