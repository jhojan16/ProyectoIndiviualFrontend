import { Box, CardMedia, Container, Typography } from "@mui/material";
import humedad from "../../assets/humedad.jpg";
import luz from "../../assets/paisaje.jpg";


const About = () => {
    return (
        <Container className=" h-screen w-full mb-40">
            <Typography variant="h1" className="font-extrabold">Nature</Typography>

            <Box className=" flex flex-col">

                <Box className="flex flex-row mb-10">
                    <Typography variant="body1" className="font-thin">
                        El cuidado de las plantas es una actividad que requiere atención constante, ya que varios factores
                        ambientales influyen en su crecimiento y salud. Sin embargo, muchas veces los cuidadores
                        enfrentan dificultades para monitorear y mantener las condiciones ideales para el desarrollo óptimo
                        de las plantas, especialmente cuando no están presentes de manera continua.
                    </Typography>

                    <Typography variant="body1" className="font-thin">
                        Hubo un caso, que nos presenta periódico El economista, “Entre enero y septiembre de este año (2023),
                        en México se registró un total de 502,550.14 hectáreas (ha) siniestradas en el campo, es decir, que
                        fueron sembradas, sin embargo, los cultivos no germinaron. Esta cifra es la más alta para un mismo periodo
                        desde por lo menos el 2018.” Como podemos evidenciar, son cantidades enormes de hectáreas perdidas por diversos
                        factores, en los que puede estar incluido la humedad y cantidad de luz.
                    </Typography>
                </Box>

                <CardMedia
                    component="img"
                    sx={{ width: screen, height: 100, display: { xs: 'none', sm: 'block' } }}
                    image={humedad}
                    alt="luz"
                    className="rounded-xl"
                />
            </Box>

            <Box className="flex flex-col mt-10">
                <Typography variant="h4" className="font-bold" gutterBottom>Cantidad de luz solar</Typography>
                <Typography variant="body1" className="font-thin">
                    La luz es fundamental para la fotosíntesis, el proceso mediante el cual las plantas convierten la energía lumínica en energía
                    química para su crecimiento y desarrollo. Una cantidad insuficiente de luz puede limitar el crecimiento de las plantas y afectar
                    su capacidad para producir nutrientes.
                </Typography>
            </Box>
            <Box className="flex flex-col mt-10 mb-10">
                <Typography variant="h4" className="font-bold" gutterBottom>Humedad del Suelo</Typography>
                <Typography variant="body1" className="font-thin ">
                    es esencial para que las plantas absorban los nutrientes y el
                    agua necesarios para su crecimiento y metabolismo.Un suelo demasiado seco puede llevar a la deshidratación y
                    la marchitez de las plantas, también el déficit de humedad hace que la planta tenga que hacer un sobresfuerzo
                    por mantener los estomas abiertos, y esto puede ocasionar que se marchite por deshidratación y afecta a la producción,
                    pues hay una pérdida de calidad del fruto y un menor cuaje, mientras que un exceso de humedad puede provocar enfermedades
                    fúngicas y pudriciones de raíces, además, el exceso de humedad reduce la transpiración, lo que disminuye la absorción de
                    nutrientes y afecta al crecimiento de la planta, dificulta la polinización y favorece la propagación de plagas y enfermedades.
                </Typography>
            </Box>

            <CardMedia
                component="img"
                sx={{
                    width: screen,
                    height: 200,
                    display: { xs: 'none', sm: 'block' },
                    borderTopLeftRadius: '16px', // Redondea la esquina superior izquierda
                    borderTopRightRadius: '16px', // Redondea la esquina superior derecha
                }}
                image={luz}
                alt="luz"
            />

        </Container>
    );
}
export default About;