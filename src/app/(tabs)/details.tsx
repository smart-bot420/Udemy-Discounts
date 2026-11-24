import { Text } from 'react-native';
import useStore from "../../../store";

export default function App(){
    const info = useStore((state) => state.info);
    
    return(
        <Text>{info.course.name}</Text>
    )
}