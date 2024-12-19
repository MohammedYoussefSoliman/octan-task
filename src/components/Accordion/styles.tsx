import styled from "@emotion/styled";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import withMuiThemeProvider from "components/MuiThemeProvider/withMuiThemeProvider";
import devices from "theme/sizes";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: theme.colors.shades[100],
  boxShadow: "none",
  border: `1px solid ${theme.colors.grey[300]}`,
  borderRadius: 6,
  width: "100%",
  overflow: "hidden",
  "&:hover": {
    borderColor: theme.colors.grey[400],
  },
  "&:before": {
    display: "none",
  },
  "&$expanded": {
    margin: 0,
  },
  [devices.lg]: {
    borderRadius: 10,
  },
}));

const OrderAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: "none",
  borderRadius: 8,
  background: "transparent",

  "&:hover": {
    borderColor: "none",
  },
  [devices.lg]: {
    borderRadius: 15,
  },
}));

const FaqAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: "none",
  background: "transparent",
  borderRadius: 10,
  "&:hover": {
    borderColor: "none",
  },
}));

export const StyledAccordion = withMuiThemeProvider<AccordionProps>(Accordion);
export const StyledOrderAccordion =
  withMuiThemeProvider<AccordionProps>(OrderAccordion);

export const StyledFaqAccordion =
  withMuiThemeProvider<AccordionProps>(FaqAccordion);

const Summary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={null} {...props} />
))(({ theme: { branding, pallet } }) => ({
  width: "100%",
  justifyContent: "space-between",
  padding: 16,
  minHeight: "auto",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "&:hover": {
    background: branding.secondaryColor ?? pallet.primary[50],
  },
  [devices.md]: {
    padding: 20,
  },
  [devices.lg]: {
    padding: 22,
  },
}));

const OrderSummary = styled((props: AccordionSummaryProps) => (
  <Summary expandIcon={null} {...props} />
))(() => ({
  padding: "0 !important",
  marginBottom: 10,
  background: "transparent",
  "&.MuiAccordionSummary-root.Mui-expanded": {
    borderBottom: "none",
  },
  "&:hover": {
    background: "none",
  },
  [devices.md]: {
    marginBottom: 12,
  },
  [devices.lg]: {
    marginBottom: 18,
  },
}));

const FaqSummary = styled((props: AccordionSummaryProps) => (
  <Summary expandIcon={null} {...props} />
))(({ theme }) => ({
  padding: "14px 18px !important",
  marginBottom: 16,
  borderRadius: 10,
  border: `1px solid ${theme.colors.purple[500]}`,
  background: theme.colors.shades[100],
  height: "60px !important",
  "&.MuiAccordionSummary-root.Mui-expanded": {
    background: theme.colors.purple[100],
  },
  "&:hover": {
    background: "none",
  },
  [devices.md]: {
    marginBottom: 18,
  },
  [devices.lg]: {
    marginBottom: 20,
  },
}));

export const AccordionSummary =
  withMuiThemeProvider<AccordionSummaryProps>(Summary);

export const AccordionOrderSummary =
  withMuiThemeProvider<AccordionSummaryProps>(OrderSummary);

export const AccordionFaqSummary =
  withMuiThemeProvider<AccordionSummaryProps>(FaqSummary);

export const Details = styled(MuiAccordionDetails)(() => ({
  width: "100%",
  padding: "16px 20px",
  overflow: "hidden",
}));

export const OrderDetails = styled(Details)(({ theme }) => ({
  background: theme.colors.shades[100],
  borderRadius: 15,
}));

export const FaqDetails = styled(Details)(({ theme }) => ({
  background: theme.colors.shades[100],
  borderRadius: 10,
}));

export const StyledAccordionDetails = withMuiThemeProvider<any>(Details);

export const StyledAccordionOrderDetails =
  withMuiThemeProvider<any>(OrderDetails);

export const StyledAccordionFaqDetails = withMuiThemeProvider<any>(FaqDetails);
