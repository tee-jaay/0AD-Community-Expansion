class CampaignSetupPage extends AutoWatcher
{
    constructor()
    {
        super("render");

        this.selectedIndex = -1;
        this.activeCategory = "All";
        this.templates = CampaignTemplate.getAvailableTemplates();
        this.visibleTemplates = [];
        this.selectedTemplate = null;

        Engine.GetGUIObjectByName("mainMenuButton").onPress =
            () => Engine.SwitchGuiPage("page_pregame.xml");

        Engine.GetGUIObjectByName("startCampButton").onPress =
            () => {
                if (this.selectedTemplate)
                    Engine.OpenChildPage(
                        "campaigns/new_modal/page.xml",
                        this.selectedTemplate
                    );
            };

        Engine.GetGUIObjectByName("categoryAll").onPress =
            () => this.setCategory("All");

        Engine.GetGUIObjectByName("categoryStory").onPress =
            () => this.setCategory("Story-driven");

        Engine.GetGUIObjectByName("categoryHistorical").onPress =
            () => this.setCategory("Historical");

        this.campaignSelection =
            Engine.GetGUIObjectByName("campaignSelection");

        this.campaignSelection.onMouseLeftDoubleClickItem = () => {
            if (this.selectedTemplate)
                Engine.OpenChildPage(
                    "campaigns/new_modal/page.xml",
                    this.selectedTemplate
                );
        };

        this.campaignSelection.onSelectionChange = () => {
            this.selectedIndex = this.campaignSelection.selected;
            this.selectedTemplate = this.selectedIndex === -1
                ? null
                : this.visibleTemplates[this.selectedIndex];
        };

        this._ready = true;
    }

    setCategory(category)
    {
        if (this.activeCategory === category)
            return;

        this.activeCategory = category;
        this.selectedIndex = -1;
        this.selectedTemplate = null;

        // Clear the actual GUI list selection before changing its contents.
        this.campaignSelection.selected = -1;

        this.render();
    }

    displayCampaignDetails()
    {
        Engine.GetGUIObjectByName("startCampButton").enabled =
            !!this.selectedTemplate;

        if (!this.selectedTemplate)
        {
            Engine.GetGUIObjectByName("campaignTitle").caption =
                translate("No campaign selected.");

            Engine.GetGUIObjectByName("campaignDesc").caption = "";

            Engine.GetGUIObjectByName("campaignImage").sprite =
                "cropped:" + 400/512 + "," + 300/512 +
                ":session/icons/mappreview/nopreview.png";

            return;
        }

        Engine.GetGUIObjectByName("campaignTitle").caption =
            translateWithContext(
                "Campaign Template",
                this.selectedTemplate.Name
            );

        Engine.GetGUIObjectByName("campaignDesc").caption =
            translateWithContext(
                "Campaign Template",
                this.selectedTemplate.Description
            );

        if ("Image" in this.selectedTemplate)
            Engine.GetGUIObjectByName("campaignImage").sprite =
                "stretched:" + this.selectedTemplate.Image;
        else
            Engine.GetGUIObjectByName("campaignImage").sprite =
                "cropped:" + 400/512 + "," + 300/512 +
                ":session/icons/mappreview/nopreview.png";
    }

    render()
    {
        this.visibleTemplates = this.templates.filter(template =>
            this.activeCategory === "All" ||
            template.Category === this.activeCategory
        );

        this.displayCampaignDetails();

        Engine.GetGUIObjectByName("categoryAll").enabled =
            this.activeCategory !== "All";

        Engine.GetGUIObjectByName("categoryStory").enabled =
            this.activeCategory !== "Story-driven";

        Engine.GetGUIObjectByName("categoryHistorical").enabled =
            this.activeCategory !== "Historical";

        Engine.GetGUIObjectByName("campaignSelection").list_name =
            this.visibleTemplates.map(camp =>
                translateWithContext("Campaign Template", camp.Name)
            );

        const identifiers =
            this.visibleTemplates.map(camp => camp.identifier);

        const selection =
            Engine.GetGUIObjectByName("campaignSelection");

        // COList needs these changed last or crashes.
        selection.list = identifiers;
        selection.list_data = identifiers;
    }
}

var g_CampaignSetupPage;

function init()
{
    g_CampaignSetupPage = new CampaignSetupPage();
}
