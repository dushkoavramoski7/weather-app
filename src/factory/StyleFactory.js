import {makeStyles} from "@material-ui/core/styles";

export const useStyles = (componentStyleFunction) => {
    const useStyle = makeStyles((theme) => componentStyleFunction(theme), { index: 1 } );
    return useStyle();
}
