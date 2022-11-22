export const robotslist = [
  {
    robot_id: 1,
    name: "Identity",
    avatar_url:
      "https://tokegameart.net/wp-content/uploads/2017/03/Dumb-Robot-2D-Character-Sprite.jpg",
    win_rate: "300",
    mmr: "1000",
  },
  {
    robot_id: 2,
    name: "AnnaBananna",
    avatar_url:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cca4a6144392641.628bd58fcb4bc.jpg",
    win_rate: "300",
    mmr: "1000",
  },
  {
    robot_id: 3,
    name: "Robot1",
    avatar_url:
      "https://img.freepik.com/vector-gratis/cute-robot-holding-phone-laptop-cartoon-vector-icon-ilustracion-ciencia-tecnologia-aislada_138676-4870.jpg",
    win_rate: "100",
    mmr: "10",
  },
  {
    robot_id: 4,
    name: "Robot2",
    avatar_url:
      "https://img.freepik.com/vector-gratis/cute-robot-holding-phone-laptop-cartoon-vector-icon-ilustracion-ciencia-tecnologia-aislada_138676-4870.jpg",
    win_rate: "100",
    mmr: "110",
  },
  {
    robot_id: 5,
    name: "GenericRobot3",
    avatar_url:
      "https://img.freepik.com/vector-gratis/cute-robot-holding-phone-laptop-cartoon-vector-icon-ilustracion-ciencia-tecnologia-aislada_138676-4870.jpg",
    win_rate: "200",
    mmr: "10",
  },
]

export const robotdetailslist = [
  {
    robot_info: {
      robot_id: 1,
      name: "Identity",
      avatar_url:
        "https://tokegameart.net/wp-content/uploads/2017/03/Dumb-Robot-2D-Character-Sprite.jpg",
      win_rate: "300",
      mmr: "1000",
    },
    code:
      `from app.game.entities import Robot\n` +
      `class IdBot(Robot):\n` +
      `  def initialize(self):\n` +
      `    return\n` +
      `  def respond(self):\n` +
      `  return,\n`,
  },
]
