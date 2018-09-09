from googleapiclient import discovery

def toxic_check(line):

    API_KEY='AIzaSyA7WaZd4D9r2LW4FsUj2KRfXBOhdhrDLns'

    # Generates API client object dynamically based on service name and version.
    service = discovery.build('commentanalyzer', 'v1alpha1', developerKey=API_KEY)

    analyze_request = {
        'comment': { 'text': line },
        'requestedAttributes': {'TOXICITY': {}}
    }

    response = service.comments().analyze(body=analyze_request).execute()
    return line, response['attributeScores']['TOXICITY']['summaryScore']['value']