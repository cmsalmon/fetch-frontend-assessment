import { Box, Button, Card, CardSection, Divider, Group, Image, Text } from "@mantine/core";
import style from './DogCard.module.scss';

function DogCard({id, img, name, age, zipcode, breed, favList, setFavList, withFavButton }) {
    let favorited = favList.includes(id);
    const handleFavClick = () => {
        if (favorited) {
            favorited = false;
            const index = favList.indexOf(id);
            favList.splice(index, 1);
            setFavList([...favList]);
        } else {
            favorited = true;
            favList.push(id);
            setFavList([...favList]);
        }
    }
    return (
        <Card 
            className={style.card}
            shadow="md"
            radius='md'
            withBorder
        >
            <CardSection className={style.imageContainer}>
                    <Image 
                        className={style.image}  
                        fit='contain' src={img} 
                        radius="xl"
                        alt={`${name}`}
                    />
            </CardSection>
            <Divider />
            <Box className={style.infoContainer}>
                <Group justify="space-between">
                    <Text fw={800}>{name}</Text>
                    <Group>
                        <Text fw={500}>Age:</Text>
                        <Text>{age}</Text>
                    </Group>
                </Group>
                <Text className={style.breed} size='sm' c='dimmed'fw={500}>{breed}</Text>
                <Group>
                    <Text size='sm' c='dimmed' fw={500}>Zip code:</Text>
                    <Text size='sm' c='dimmed'>{zipcode}</Text>
                </Group>
                {withFavButton &&
                    <Button className={style.favorite} color='#ffffff00'  onClick={() => handleFavClick()}>
                        {!favorited ? 
                            <Image className={style.favoriteIcon} src='https://img.icons8.com/?size=100&id=87&format=png&color=000000'/> :
                            <Image className={style.favoriteIcon} src='https://img.icons8.com/?size=100&id=7697&format=png&color=000000'/>
                        }
                    </Button>
                }
            </Box> 
            
            
        </Card>
    );
}

export default DogCard