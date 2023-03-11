import mysql from 'mysql'


const connection = mysql.createConnection({
  host: 'talleres-instance-1.ceppyecdry88.us-east-1.rds.amazonaws.com',
  user: 'franco',
  password: '6strings',
  database: 'talleres'
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectarse a la base de datos: ' + error.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});



const registrarInscripcion = (req) => {

   const alumno = req.body.alumno;
   const taller = req.body.taller;


  connection.query(`INSERT INTO alumnos(alumno) VALUES ('${alumno}')`,
 
  (error, results, fields) => {
    if (error) {
      console.error('Error al insertar alumno: ' + error.stack);
      return;
    }

    const alumnoId = results.insertId;

    connection.query(
      `SELECT taller_id FROM talleres WHERE taller = '${taller}'`,
      (error, results, fields) => {
        if (error) {
          console.error('Error al buscar taller: ' + error.stack);
          return;
        }

        const tallerId = results[0].taller_id;

        connection.query(
          `INSERT INTO inscripciones(alumno_id, taller_id) VALUES (${alumnoId}, ${tallerId})`,
          (error, results, fields) => {
            if (error) {
              console.error('Error al insertar inscripción: ' + error.stack);
              return;
            }

            console.log('Inscripción registrada correctamente');
          }
        );
      }
    );
  }
)
}






const consultaTalleres = async() => {


  connection.query('SELECT taller FROM talleres', (error, results, fields) => {
    if (error) {
      console.error('Error al realizar la consulta: ' + error.stack);
      return;
    }
    const talleres = results.map(result => result.taller)
    console.log(talleres)
  })
 
}



export {registrarInscripcion, consultaTalleres}