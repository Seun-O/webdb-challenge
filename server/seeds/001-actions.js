exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          id: 1,
          name: "Fork Project",
          description: "Clone the project then fork it",
          notes: "Add PM",
          completed: true,
          project: 1
        },
        {
          id: 2,
          name: "Complete Project",
          description: "Complete MVP",
          notes: "Meet all requirements",
          completed: false,
          project: 1
        },
        {
          id: 3,
          name: "Finish Stretch",
          description: "Complete all 3 stretch tasks",
          notes: "Mvp done, stretch next",
          completed: true,
          project: 2
        },
        {
          id: 4,
          name: "Study for Sprint",
          description: "Review WebDB-III/IV",
          notes: "Review difficult materials",
          completed: true,
          project: 2
        }
      ]);
    });
};
