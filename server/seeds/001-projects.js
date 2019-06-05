exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          id: 1,
          name: "WebDb Challenge",
          description: "A Sprint Challenge to test DB knowledge",
          completed: false
        },
        {
          id: 2,
          name: "WebDB-IV",
          description: "Project training on data normalization",
          completed: true
        }
      ]);
    });
};
