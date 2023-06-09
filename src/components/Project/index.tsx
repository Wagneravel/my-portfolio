import {
  Project as ProjectWrapper,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";
import { SiVercel } from "react-icons/si";
interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
}

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: Response = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc`
      )

      const json = await data.json();

      setRepositories(json);

      // if (!data.ok) {
      //   throw data;
      // }

      return json;
    };
    fetchData();
  }, []);

  return (
    <>
      {repositories &&
        repositories?.map((repository) => (
          <ProjectWrapper key={repository.id}>
            <Text
              as="h2"
              type="heading3"
              css={{ marginBottom: "$3" }}
              color="grey1"
            >
              {repository.name}
            </Text>

            {repository.language && (
              <ProjectStack>
                <Text type="body2">Linguagem:</Text>
                <ProjectStackTech>
                  <Text color="brand1" type="body2">
                    {repository.language}
                  </Text>
                </ProjectStackTech>
              </ProjectStack>
          )}

          <Text type="body1" color="grey2">
            {repository.description?.substring(0, 129)}
          </Text>
          <ProjectLinks>
            <ProjectLink target="_blank" href={repository.html_url}>
              <FaGithub /> Github Code
            </ProjectLink>
            {repository.homepage && (
              <ProjectLink target="_blank" href={repository.homepage}>
                <SiVercel /> Aplicação
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectWrapper>
      ))}
    </>
  );
};