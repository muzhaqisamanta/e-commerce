import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageHoverCard = ({ url, onDelete, onView }) => {
  const [hide, setHide] = useState(true);

  if (!url) return <></>;

  return (
    <Card
      sx={{ width: 120 }}
      onMouseEnter={() => setHide((prev) => !prev)}
      onMouseLeave={() => setHide((prev) => !prev)}
    >
      <CardMedia sx={{ height: 120 }} image={url} />
      <Box
        width={"120px"}
        height={"32px"}
        marginTop={"-32px"}
        hidden={hide}
        sx={{
          opacity: ".9",
        }}
        bgcolor="White"
      >
        <Box direction="row" sx={{ marginX: "13px", width: "120px" }}>
          <Tooltip arrow title="Preview">
            <IconButton size={"30px"} onClick={onView}>
              <VisibilityIcon color="interactive" />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Delete">
            <IconButton size={"30px"} onClick={onDelete}>
              <DeleteIcon color="critical" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default ImageHoverCard;
