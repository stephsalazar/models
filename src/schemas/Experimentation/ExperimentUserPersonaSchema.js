module.exports = (conn) => {
  const ExperimentUserPersona = new conn.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    civilStatus: { type: String, required: true },
    occupation: { type: String, required: true },
    problem: { type: String, required: true },
    description: { type: String, required: true },
    pains: { type: String, required: true },
    motivation: { type: String, required: true },
  }, { timestamps: true });

  return ExperimentUserPersona;
};
