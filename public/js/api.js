const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/user/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },
  async addExercise(data) {
    console.log("In addExercise:", data)
    const res = await fetch("/api/workouts/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    console.log("createWorkout:", data)
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    return json;
  },

  async getWorkoutsInRange() {
    console.log("API Workouts in range")
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
