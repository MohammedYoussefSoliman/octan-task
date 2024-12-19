import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "components/Grids";
import Paper from "components/Paper";
import { H5 } from "components/Typography";
import { ErrorLottie } from "assets/lotties";
import { Button } from "components/Buttons";
import urls from "helpers/urls";

export default function InvalidStore() {
  const navigate = useNavigate();

  return (
    <Paper width={{ xs: "100%", md: 512 }} ph={{ xs: 16, md: 50 }}>
      <Flex direction="column" align="center" gap={{ xs: 43 }} fullWidth>
        <ErrorLottie size={97} />
        <H5 text="notRegisteredStore" />
        <Flex direction="column" align="center" mt={{ xs: 2 }} fullWidth>
          <Button
            onClick={() => {
              navigate(urls.home);
            }}
            fullWidth
          >
            goToYamm
          </Button>
        </Flex>
      </Flex>
    </Paper>
  );
}
