import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { action } from "mobx"
import { observer } from "mobx-react-lite";
import { getAllFormats } from '../format/Format';
import { ObserverInput, parseNumberInString } from './ObserverInput';
import { NumberInUnit, UnitOfLength } from '../math/Unit';
import { AppProps } from '../App';

const GeneralConfigAccordion = observer((props: AppProps) => {
  const gc = props.app.gc;

  const formats = getAllFormats();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Configuration</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography gutterBottom>Format</Typography>
        <Box className="panel-box">
          <Select size="small" sx={{ maxWidth: "100%" }}
            value={formats.findIndex((x) => x.getName() === props.app.format.getName())}
            onChange={action((e: SelectChangeEvent<number>) => props.app.format = formats[parseInt(e.target.value + "")])}>
            {
              formats.map((x, i) => {
                return <MenuItem key={i} value={i}>{x.getName()}</MenuItem>
              })
            }
          </Select>
        </Box>
        <Box className="flex-editor-panel" sx={{ marginTop: "2vh" }} >
          <FormControl sx={{ width: "8rem" }}>
            <InputLabel id="uol-label">Unit of Length</InputLabel>
            <Select labelId="uol-label" label="Unit of Length" size="small" value={gc.uol} onChange={action((e: SelectChangeEvent<UnitOfLength>) => gc.uol = e.target.value as UnitOfLength)}>
              {
                Object.keys(UnitOfLength).filter((x) => !isNaN(parseInt(x))).map((x) => {
                  return <MenuItem key={x} value={parseInt(x)}>{UnitOfLength[parseInt(x)]}
                  </MenuItem>
                })
              }
            </Select>
          </FormControl>
          <ObserverInput
            sx={{ width: "6rem" }}
            label="Knot Density"
            getValue={() => gc.knotDensity + ""}
            setValue={(value: string) => gc.knotDensity = parseNumberInString(value, gc.uol,
              new NumberInUnit(0.1, UnitOfLength.Centimeter), new NumberInUnit(100, UnitOfLength.Centimeter))
            }
            isValidIntermediate={(candidate: string) => candidate === "" || new RegExp(/^[0-9]+(\.[0-9]*)?$/g).test(candidate)}
            isValidValue={(candidate: string) => new RegExp(/^[0-9]+(\.[0-9]*)?$/g).test(candidate)}
          />
        </Box>
        <Typography sx={{ marginTop: "2vh" }} gutterBottom>Robot Visualize</Typography>
        <Box className='flex-editor-panel'>
          <ObserverInput
            label="Width"
            getValue={() => gc.robotWidth + ""}
            setValue={(value: string) => gc.robotWidth = parseNumberInString(value, gc.uol,
              new NumberInUnit(0.1, UnitOfLength.Centimeter), new NumberInUnit(100, UnitOfLength.Centimeter))
            }
            isValidIntermediate={(candidate: string) => candidate === "" || new RegExp(/^[0-9]+(\.[0-9]*)?$/g).test(candidate)}
            isValidValue={(candidate: string) => new RegExp(/^[0-9]+(\.[0-9]*)?$/g).test(candidate)}
          />
          <ObserverInput
            label="Height"
            getValue={() => gc.robotHeight + ""}
            setValue={(value: string) => gc.robotHeight = parseNumberInString(value, gc.uol,
              new NumberInUnit(0.1, UnitOfLength.Centimeter), new NumberInUnit(100, UnitOfLength.Centimeter))
            }
            isValidIntermediate={(candidate: string) => candidate === "" || new RegExp(/^[0-9]+(\.[0-9]*)?$/g).test(candidate)}
            isValidValue={(candidate: string) => new RegExp(/^[0-9]+(\.[0-9]*)?$/g).test(candidate)}
          />
          <FormControlLabel control={
            <Checkbox checked={gc.showRobot} onChange={action((e, c) => gc.showRobot = c)} />
          } label="Show Robot" sx={{ whiteSpace: "nowrap" }} />
        </Box>
        {gc.getConfigPanel()}
      </AccordionDetails>
    </Accordion>
  )
});

export { GeneralConfigAccordion };